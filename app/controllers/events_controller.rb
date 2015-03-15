class EventsController < ApplicationController

  def home
  end

  def new
    @event = Event.new
  end

  def create
    @event = Event.new(event_params)
    if @event.save
      redirect_to @event
    else
      render :new
    end
  end

  def show
    @event = Event.find(params[:id])
    if @event.get_results.count == 0
      flash[:notice] = 'No results found'
      redirect_to new_event_path
    else
      @event = Event.find(params[:id])
    end
  end

  def edit
    @event = Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    @event.update(:name => params[:name])
    @event.update(:date => params[:datetime])
    @event.update(:lat => params[:lat])
    @event.update(:long => params[:long])
    @event.update(:taxonomies => params[:taxonomies])
    @event.update(:url => params[:url])
    @event.update(:img_url => params[:img_url])
    @event.update(:address => params[:address])
    # raise params
    # @event.update(:user_id => @event.id)
    redirect_to event_results_path(@event)
  end

  private
    def event_params
      params.require(:event).permit(:name, :date)
    end
end
