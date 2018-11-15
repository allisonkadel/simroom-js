class ReportsController < ApplicationController

    def index
        @equipment = Equipment.find(params[:equipment_id])
        @reports = @equipment.reports
        respond_to do |f|
            f.html
            f.json {render :json => @reports}
        end
    end

    def new
        @equipment = Equipment.find(params[:equipment_id])
        @report = Report.new
    end

    def create
        @report = Report.new(:content => params[:report][:content], :equipment_id => params[:equipment_id])
        if @report.save
            redirect_to equipment_reports_path(@report.equipment)
        else
            @equipment = Equipment.find(params[:equipment_id])
            render :new
        end
    end
    
end
