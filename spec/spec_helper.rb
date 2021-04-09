# frozen_string_literal: true

require "bundler/setup"
require "simplecov"
require "rspec"

SimpleCov.start

RSpec.configure do |config|
  config.example_status_persistence_file_path = ".rspec_status"

  # Disable RSpec exposing methods globally on `Module` and `main`
  config.disable_monkey_patching!
end
