desc "This task makes a request to darksky-api and cleans old data"
task :update_reports => :environment do
  puts "Updating Weather Reports... this takes a few mins to complete!"
  FetchWeatherJob.perform_later
  puts "Success!"
end
