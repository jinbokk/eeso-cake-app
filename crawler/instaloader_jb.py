import instaloader

profile_name = input("Enter Insta Profile name : ")

print("Downloading Media...")

instaloader.Instaloader().download_profile(
    profile_name, profile_pic_only=False, fast_update=True)

print("Download Completed !")