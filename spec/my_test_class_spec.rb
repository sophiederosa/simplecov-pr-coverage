# frozen_string_literal: true
require 'spec_helper'
require_relative "../testclass/my_test_class.rb"

RSpec.describe MyTestClass do
    describe ".test" do
      subject { described_class.test }

      context "testing out simplecov" do
        it "returns true" do
          expect(subject).to eq(true)
        end
      end
    end
end
  