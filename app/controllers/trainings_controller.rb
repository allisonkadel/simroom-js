class TrainingsController < ApplicationController

    def index
        @trainings = Training.all
    end

    def new
        @training = Training.new
        render :layout => false
    end

    def create
        @training = Training.new(training_params)
        if @training.save
            redirect_to trainings_path
        else
            render :new
        end
    end

    def show
        @training = Training.find(params[:id])
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
