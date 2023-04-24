import axios from "axios";

export const predictImage = async (req, res) => {
  try {
    const { image } = req.body;

    if (!image) return res.status(400).send("No image");
    let cleansedImage = image.replace(/^data:image\/\w+;base64,/, "");
    let b64string = cleansedImage;
    let buffer = Buffer.from(b64string, "base64");

    const requestToAWS = axios({
      method: "post",
      url: process.env.AWS_ENDPOINT,
      headers: {
        "Content-type": "application/x-image",
      },
      data: buffer,
    })
      .then((resp) => {
        return resp.data;
      })
      .catch((err) => {
        console.log("Error", err);
      });

    const respFromAWS = await requestToAWS;
    return res.json({ message: respFromAWS });
  } catch (err) {
    console.log(err);
  }
};
