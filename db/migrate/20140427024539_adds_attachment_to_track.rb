class AddsAttachmentToTrack < ActiveRecord::Migration
  def change
    add_attachment :tracks, :music_file
  end
end
