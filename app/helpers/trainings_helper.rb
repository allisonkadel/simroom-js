module TrainingsHelper

    def admin_edit_button
        button_to "Edit Training", edit_training_path(@training), :class => "back_to_trainings", 
        method: :get if admin?
    end

    def admin_cancel_button
        button_to "Cancel Training", {action: "destroy", id: @training.id}, :class => "back_to_trainings",
        method: :delete if admin?
    end

end
