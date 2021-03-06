import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Typography,
  CardContent,
  makeStyles,
  Link,
  CardMedia,
  Grid,
} from "@material-ui/core";
import StorageMain from "../../../../../components/Storage/StorageMain";

const styles = makeStyles((theme) => ({
  flexDiv: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    flexWrap: "wrap",
  },
  flexRowDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "12px",
    flexWrap: "wrap",
  },
  image: {
    // aspectRatio: "auto 36 / 32",
    maxWidth: "100%",
    height: "auto",
    maxHeight: "300px",
  },
}));

function ProductImage({ productData, handleProductData }) {
  const classes = styles();
  const [productImage, setProductImage] = useState(productData.image);
  const route_prefix = "http://localhost:8000/laravel-filemanager";
  const origin_prefix = "http://localhost:8000";
  const [isStorageOpen, setIsStorageOpen] = useState(false);
  const windowRef = useRef(null);

  useEffect(() => {
    handleProductData("image", productImage);
    return () =>
      window.removeEventListener("message", onRecieveImageUrls, false);
    // eslint-disable-next-line
  }, [productImage]);

  const selectImage = () => {
    windowRef.current = window.open(
      route_prefix + "?type=file&multiple=false",
      "ProductImage",
      "width=900,height=600"
    );

    window.addEventListener("message", onRecieveImageUrls, false);
  };

  const onRecieveImageUrls = (event) => {
    if (
      event.source === windowRef.current &&
      event.origin === origin_prefix &&
      Array.isArray(event.data)
    ) {
      setProductImage(event.data[0].url);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <StorageMain status={isStorageOpen} setIsStorageOpen={setIsStorageOpen} />
      <Card>
        <CardActionArea>
          <Box pt={1} pl={2}>
            <Typography gutterBottom variant="h6">
              Product image
            </Typography>
          </Box>
          <Divider />
        </CardActionArea>
        <CardContent className={classes.flexRowDiv}>
          <Link onClick={() => setIsStorageOpen(true)}>Open storage</Link>
          {productImage ? (
            <React.Fragment>
              <Grid container>
                <Grid item xs={4} md={12}>
                  <CardMedia
                    component="img"
                    alt="Product image"
                    title="Product image"
                    onClick={selectImage}
                    image={productImage}
                    className={classes.image}
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle2" gutterBottom>
                Click on the image to edit or update.
              </Typography>
              <Link onClick={() => setProductImage("")}>
                Remove product image
              </Link>
            </React.Fragment>
          ) : (
            <Link onClick={selectImage}>Set product image</Link>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default ProductImage;
