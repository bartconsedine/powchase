require 'date'

module TimeFormat
  class << self
    def format_time(time)
      Date.strptime(time.to_s,'%s').strftime('%m/%d/%Y')
    end
  end
end
