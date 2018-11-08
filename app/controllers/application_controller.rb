class ApplicationController < ActionController::Base

    helper_method :current_user
    helper_method :admin?

    before_action :require_logged_in, except: [:new, :create, :home]

    def logged_in?
        !!current_user
    end

    def admin?
        @training.user_id == current_user.id
    end

    private

        def current_user
            @current_user ||= User.find(session[:user_id]) if session[:user_id]
        end

        def require_logged_in
            redirect_to root_path unless logged_in?
        end
end
