import React, { useState, useContext, useEffect } from "react";
import { Grid, Link, TextField } from "@material-ui/core";
import ButtonProgress from "../../../../../../components/common/ButtonProgress/ButtonProgress";
import api from "../../../../../../util/api";
import { ProductContext } from "../../ProductItem";
import CustomFeild from "../../../../../../components/common/CustomFeild/CustomFeild";
import { useSnackbar } from "notistack";
import swal from "sweetalert";

const initialData = {
  regular_price: "",
  offer_price: "",
  schedule_offer: 0,
  offer_from: "",
  offer_to: "",
};

function GeneralMain() {
  const [generalData, setGeneralData] = useState(initialData);
  const [btnLoading, setBtnLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const productContext = useContext(ProductContext);

  const handleChange = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setGeneralData({ ...generalData, [name]: value });
  };

  useEffect(() => {
    productContext.mainLoader(true);
    api()
      .get(`/products/simple_bundle/${productContext.product_id}`)
      .then((res) => setGeneralData({ ...res.data.generalData }))
      .catch((error) => {
        if (error.response && error.response.status === 422)
          swal(error.response.data.message);
      })
      .finally(() => productContext.mainLoader(false));
    // eslint-disable-next-line
  }, []);

  const update = () => {
    setBtnLoading(true);
    api()
      .post(`/products/simple_bundle/${productContext.product_id}`, generalData)
      .then((res) => {
        enqueueSnackbar("Product data saved !", { variant: "success" });
      })
      .catch((error) => {
        if (error.response && error.response.status === 422)
          swal(error.response.data.message);
      })
      .finally(() => setBtnLoading(false));
  };

  return (
    <Grid container style={{ width: "100%" }} spacing={2} direction="row">
      <Grid item xs={6}>
        <CustomFeild
          prefix="Rs "
          label="Regular price"
          variant="outlined"
          color="primary"
          fullWidth
          value={generalData.regular_price}
          name="regular_price"
          size="small"
          onChange={handleChange}
        />
      </Grid>
      <Grid item xs={6}>
        <CustomFeild
          prefix="Rs "
          label="Offer price"
          variant="outlined"
          color="primary"
          size="small"
          fullWidth
          value={generalData.offer_price}
          name="offer_price"
          onChange={handleChange}
        />
      </Grid>

      {generalData.schedule_offer !== 1 && (
        <Grid item xs={12}>
          <Link
            onClick={() =>
              setGeneralData({ ...generalData, schedule_offer: 1 })
            }
            variant="body2"
          >
            Schedule
          </Link>
        </Grid>
      )}
      {generalData.schedule_offer === 1 && (
        <React.Fragment>
          <Grid item xs={6}>
            <TextField
              label="Offer from"
              variant="outlined"
              color="primary"
              size="small"
              fullWidth
              name="offer_from"
              type="datetime-local"
              value={
                generalData.offer_from &&
                generalData.offer_from.replace(" ", "T")
              }
              onChange={(e) =>
                setGeneralData({
                  ...generalData,
                  offer_from: e.target.value.replace("T", " "),
                })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Offer to"
              variant="outlined"
              color="primary"
              size="small"
              fullWidth
              type="datetime-local"
              value={
                generalData.offer_to && generalData.offer_to.replace(" ", "T")
              }
              name="offer_to"
              onChange={(e) =>
                setGeneralData({
                  ...generalData,
                  offer_to: e.target.value.replace("T", " "),
                })
              }
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={10}>
            <Link
              onClick={() => {
                setGeneralData({
                  ...generalData,
                  schedule_offer: 0,
                });
              }}
              variant="body2"
              color="secondary"
            >
              Cancel schedule
            </Link>
          </Grid>
        </React.Fragment>
      )}
      <Grid item xs={10}>
        <ButtonProgress
          name="update"
          color="primary"
          variant="contained"
          size="small"
          loading={btnLoading}
          handleButtonClick={update}
        />
      </Grid>
    </Grid>
  );
}

export default GeneralMain;
