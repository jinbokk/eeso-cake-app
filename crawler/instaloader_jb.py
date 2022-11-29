import instaloader

profile_name = input("Enter Insta Profile name : ")

print("Downloading Media...")

instaloader.Instaloader(
    dirname_pattern="eeso_cake_crawler_photo",
    download_videos=False,
    download_video_thumbnails=False,
    download_geotags=False,
    download_comments=False,
    save_metadata=False,
    compress_json=False,
    post_metadata_txt_pattern="",
    # – --post-metadata-txt, default is {caption}. Set to empty string to avoid creation of post metadata txt file.
).download_profile(
    profile_name,
    fast_update=True,
)

print("Download Completed !")
