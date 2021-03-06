class TrainingsController < ApplicationController

    def index
        @trainings = Training.all
        @training = Training.new
    end

    def new
        @training = Training.new
    end

    def create
        @training = Training.new(training_params)
        if @training.save
            respond_to do |f|
                f.json {render :json => @training}
                f.html {render :show, :layout => false}
            end
        else
            raise params.inspect
        end
    end

    def show # allows rails to serve either html or json response from same endpoint
        @training = Training.find(params[:id])
        respond_to do |f|
            f.html
            f.json {render json: @training}
        end
    end

    def edit
        @training = Training.find(params[:id])
        if @training.user_id != current_user.id
            redirect_to training_path(@training)
        end
    end

    def update
        @training = Training.find(params[:id])
        if @training.update(training_params) && admin?
            redirect_to training_path(@training)
        else
            render :edit
        end
    end

    def next
        @training = Training.find(params[:id])
        @next_training = @training.next
        render :json => @next_training
    end

    def destroy
        @training = Training.find(params[:id])
        @training.destroy if admin?
        redirect_to trainings_path
    end

    def filter
        @future_trainings = Training.future_trainings
    end

    def filter_past
        @past_trainings = Training.past_trainings
    end

    private

        def training_params
            params.require(:training).permit(
                :name,
                :description,
                :date,
                :simroom,
                :equipment_id,
                :user_id
            )
        end

end
