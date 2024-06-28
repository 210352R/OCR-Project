import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useState } from "react";
import ImagePickerScreen from "../components/ImagePicker";

// Import an image for the background
const backgroundImage = {
  uri: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAKwAtwMBIgACEQEDEQH/xAAcAAADAAMBAQEAAAAAAAAAAAAAAwQBAgUGBwj/xAAyEAADAAECBAUBBgYDAAAAAAAAAQIDBBEFEiExBhNBUWFxUoGRobHBByIyQmLRM1Ph/8QAGwEAAgMBAQEAAAAAAAAAAAAAAwQAAQIFBgf/xAAfEQEBAQEBAAIDAQEAAAAAAAAAAgEDERITBCExUSL/2gAMAwEAAhEDEQA/AO1zhzkfmfIeYeh+Lx3zWc5lWR+YbLIV4v5YsVmyskVmysrxvKVqxisjVjJsxuN5StWMmiOaGzZncEylc0MmiWaGzRjcEzVUs3mieaGzQPcEzVM0Mlk00OlgtGzT0zdMTIxMHo2GpmxojdehnRJUaZd38FBpinlxqX3NwFb+3U555OYwANgZEfHPP+pt531IuYOdnqdl82ytXLN8m6y/JzudfJlX8k+LWXrpLN8jZynLnI/cZOYzsN518dWbGKzm4824+Mu4PZHnp66E2MmiKbHTYPcGmls2OmiOKHRYPcGzVk0Olkk0OigW4NOqpY6WTTQ6KB1g06oljZJ5Y6Hvvt6AdHnTU+jZVpY563fZfqI0+N5a+F3Z0VKmVM+n5gbo7+Py+W+6ygAALoNaAKAtb4Vzhzk/OHOeqfPPgo5zKomVmysifBSqNlZMrNlZGNhWra7DoytESoZNlees/vHTx5dyrHe5x8eRosw5N/UFUix0/wBdOLKIo5+OinHYHcOTS+KHxRFjooigO4YnVkMdDJofTcs02HJme2OW9u79EBoxHu/wyWWYMDqVd7zj/UMWPFg7tZcnt/ahq5s1b2936eyAb+zvLmp0/wDP2XLjXZL1fuUGkTyrZdl2NhWv663OfjLIABkRpYBYFo/PPmB5hL5hnnPVPE/Wq8w2VkfOZVkV9a1WbqyKbN5sge8102NmiKbGxZAqhdNDseRrsRRW46KM7gGz5rq4cm5Zjo5OC3vt1OzpNHqM3VQ5n3roAs1x3aw/HXYu0uHJmb8uW0u77JfV9kb6XQRj2dN2/Z9jpQm0k9uVdlt0QvTo8+WjT6bDi65Kea/sy9pLOa7XL0mPsytkLxxsvTcoiBatzHQiNGOF3SLMMbPcXjkpxrYW6V7h/jz831ujIALnAAARbSwCwLW/MvmB5hNzmPMPUvKfWq8w2WQk5wWQifWtWQZOQgWQ3nKRjebozkHRZzpyl/DdNqNfqJwaWOe33fpK92/YoCuarHbO9w3geq1PLefbBj/yX8z+46nB+Cabh0q9ll1Hrkpdn/ivT69zsyt0DqvGZ4ZWp9FwzS6RLyse9r+++tf+fcdGJ+/5ZiJHxItdnefHz+NogoxyaxI+JFrs9z5tokoiTSEPhC10biG8SPXQXCGC9abjPGQADIoAAIjSwCwLR+VOcxzkvmo1eX5PU+a4P1rOcx5iInm+TTzvknmtfS6XmL3BZfk5nnv5Bah/JPNT6He4fiy63V49NgXNkyPaV+59V4NwvDwvRrBi60+uS9utv/XweR/hpw9vT5uKZZ3dPysXwl/U1+n3HvJRjXO/I3/v44bA+EKhFEC903zk2EPhCoRRArenYk2B8IVA6BetNxh0IfAmB0AKHnDJGGkm4LTEgAApsAAERrS3AywIj8dO2YbMAeu8c3wAAE8WAACeI+2eEME6fw3w7HK6PCrf1r+b9zuwef8ABmpnVeGuH0n/AE4vLa+Zbn9D0EC9PP17nWvf9Pxj4QmGPhi1GuZ8D4YiGOhi1HYUQOknhjpYvRmVMMdDJpY6GB0eVEsYIljUwWjyyBkwU0AACLYADJEfjcAA9e5wAAIgAAIj3n8M+MzhzZeFZq2WV+Zg3+1t1X3pL8D6XFdj89xkrFavHTm5ac0ujTR9X8H+LsXFccaTWXOPXpevRZdvVez+ANOZ+Z+Pvv2S9pDHwyKL+4oihe4L86VxQ6KJJodNC9SdilcUOmiObHTYCoNzSyKGyyObHTYGoHnVk0NmiObHTQGpHnVSZlipoYnuC3PBcZAwZKWwwBgRH44AAPXucAACIAAwZ3UZ23G46c0nLaafR+xpKGxJjWa17Xw/431OllYOKTWpxJbLLP8AyL6+j/J/J73hnF9HxHHz6PUTlXql/VP1XdHxSPkpwZcmHIsmG6i57VL2aM+ekOvGd33P1r7pGZdNnvv7FEZPk+U8O8X8R0+06nl1Mf59K/Ffvuen4f4u0GdqctXgp/8AYuj+jRiuYOfKHtJyfI6chxNNr8WeFeHLNz7zSZZGde4GuQ8dXVmxs2c2Mvv0+o6MvyArmbi3Smx0Wc6MhRFga5mYpfFj5ogix8WL1BidWJ7mRUUMT3F6nwVkAMmUfjcAA9e5wADBXqA2SBIZMg91W6zEjpRiZGzJQNUzMjZRrKGyiwK1tI6W+3oLlDZRYNH4cuTHavHdRX2pez/E7Oj8RcS06S85ZV7ZVv8An3/M4aGyX5mg69no/GPpqdM184q/Z/7O9ovEGg1HSdQoftk6fn2PmcNlGOn069gdRjUddl9ew55qVU0nL7NPoV48m6T37nyXR6zUaWubT5bh+uz6fh6/eek4b4pyw1OtxLIvtx0r8PX8gF8j3Lv/AK9/jsox2cTh3EtNrcfPpsytLuvVfVHSxZF7idw6HO/XSx2Uw9yDHRVjoTuTM6oA13AXb8fjoAA9buuaO5lIEbyjG6rdZmRsyYlDZRQNUJkdMmsjUQKtEoZKMSMkgW62lDJRrIxFhVrKGSaoZJoLW8j4ESUYzOsz/T4H49xED4MaPKzTZ8mDJOTFdRc/3S+p7HgfiGc9Th1m0ZX0V+lfX2Z4qB+Kns+vZgrnNNc+mxvr6vhyb+pdhrc8j4U1ebNguMtcyxUlLffY9VgZze0+Ovyv556uAAETD//Z",
};

export default function CameraScreen() {
  const [image, setImage] = useState(null);
  return (
    <ImageBackground source={backgroundImage} style={styles.background}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Capture Your Bill</Text>
        <ImagePickerScreen image={image} setImage={setImage} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Add a semi-transparent overlay
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
    marginBottom: 20,
  },
});
