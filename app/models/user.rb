require 'net/http'
require 'json'

class User < ActiveRecord::Base
  def to_params
    {'refresh_token' => refresh_token,
    'client_id' => ENV['GOOGLE_ID'],
    'client_secret' => ENV['GOOGLE_SECRET'],
    'grant_type' => 'refresh_token' }
  end

  def request_token_from_google
    url = URI('https://accounts.google.com/o/oauth2/token')
    Net::HTTP.post_form(url, self.to_params)
  end

  def refresh!
    response = request_token_from_google
    data = JSON.parse(response.body)
    update_attributes(
      access_token: data['access_token'],
      expires_at: Time.now + (data['1800'].to_i).seconds)
  end

  def expired?
    expires_at < Time.now
  end

  def fresh_token
    refresh! if expired?
    access_token
  end



#### FACEBOOK AUTH ####

 def self.create_with_omniauth(auth)
    create! do |user|
      user.provider = auth["provider"]
      user.uid = auth["uid"]
      user.name = auth["info"]["name"]
    end
  end

end
