import React, { useState, useContext } from "react";
import {
  Box,
  Card,
  CardActionArea,
  Divider,
  Typography,
  CardContent,
  makeStyles,
  IconButton,
  Button,
  TextField,
  Checkbox,
  FormControlLabel,
  Link,
  Grid,
  FormControl,
  Select,
  MenuItem,
} from "@material-ui/core";
import NativeSelect from "@material-ui/core/NativeSelect";
import GamesIcon from "@material-ui/icons/Games";
import CreateIcon from "@material-ui/icons/Create";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PublishIcon from "@material-ui/icons/Publish";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import LineStyleIcon from "@material-ui/icons/LineStyle";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import ButtonProgress from "../../../../../components/common/ButtonProgress/ButtonProgress";
import { ProductContext } from "../ProductItem";
import api from "../../../../../util/api";

const styles = makeStyles((theme) => ({
  icon: {
    fontSize: "14px",
  },
  boldFont: {
    textTransform: "capitalize",
    fontWeight: "bold",
  },
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
  flexRowDiv2: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "6px",
    flexWrap: "wrap",
  },
  btnSmall: {
    padding: "0",
    textTransform: "capitalize",
    fontSize: "12px",
  },
  otherGrid: {
    backgroundColor: theme.palette.neutral.brown,
  },
}));

function PublishMain({
  status,
  is_trashed,
  visibility,
  published_on,
  label,
  symbol,
  is_featured,
  handleProductData,
  updateBtnLoader,
  updateData,
}) {
  const classes = styles();

  const [editMode, setEditMode] = useState({
    status: false,
    visibility: false,
  });
  const [newValues, setNewValues] = useState({});

  const productContext = useContext(ProductContext);

  const toggleEditMode = (name) => {
    setEditMode({ ...editMode, [name]: !editMode[name] });
    setNewValues({ ...newValues, [name]: "" });
  };

  const handleSelect = (e) => {
    setNewValues({ ...newValues, [e.target.name]: e.target.value });
  };

  const handleOkButton = (name) => {
    if (newValues[name] || name === "symbol") {
      handleProductData(name, newValues[name]);
    }
    setEditMode({ ...editMode, [name]: !editMode[name] });
  };

  const copyToNewDraft = () => {
    productContext.mainLoader(true);
    api()
      .post(`/products/draft/${productContext.product_id}`)
      .then((res) => {
        window.open(`/app/products/edit/${res.data}`);
        console.log(res.data);
      })
      .catch((e) => console.log(e))
      .finally(() => {
        productContext.mainLoader(false);
      });
  };

  return (
    <div style={{ width: "100%" }}>
      <Card>
        <CardActionArea>
          <Box pt={1} pl={2}>
            <Typography gutterBottom variant="h6">
              Publish
            </Typography>
          </Box>
          <Divider />
        </CardActionArea>
        <CardContent className={classes.flexRowDiv}>
          {/* status */}
          <div className={classes.flexDiv}>
            <GamesIcon className={classes.icon} />
            Status:
            <span className={classes.boldFont}>{status}</span>
            {!editMode.status && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => toggleEditMode("status")}
              >
                <CreateIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {editMode.status && (
            <div className={classes.flexDiv}>
              <NativeSelect
                defaultValue={status}
                onChange={handleSelect}
                name="status"
                style={{ minWidth: "120px" }}
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </NativeSelect>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="primary"
                onClick={() => handleOkButton("status")}
              >
                ok
              </Button>
              <bold s>/</bold>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="secondary"
                onClick={() => toggleEditMode("status")}
              >
                Cancel
              </Button>
            </div>
          )}
          {/* visibility */}
          <div className={classes.flexDiv}>
            <VisibilityIcon className={classes.icon} />
            Visibility:
            <span className={classes.boldFont}>
              {visibility.replace("_", " ")}
            </span>
            {!editMode.visibility && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => toggleEditMode("visibility")}
              >
                <CreateIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {editMode.visibility && (
            <div className={classes.flexDiv}>
              <NativeSelect
                defaultValue={visibility}
                onChange={handleSelect}
                name="visibility"
                style={{ minWidth: "120px" }}
              >
                <option value="public">Public</option>
                <option value="hidden">Hidden</option>
                <option value="search_only">Search only</option>
                <option value="grouped_product">Grouped product only</option>
              </NativeSelect>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="primary"
                onClick={() => handleOkButton("visibility")}
              >
                ok
              </Button>
              <bold s>/</bold>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="secondary"
                onClick={() => toggleEditMode("visibility")}
              >
                Cancel
              </Button>
            </div>
          )}
          {/* published on */}
          <div className={classes.flexDiv}>
            <PublishIcon className={classes.icon} />
            Published on:
            <span className={classes.boldFont}>{published_on}</span>
            {!editMode.published_on && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => toggleEditMode("published_on")}
              >
                <CreateIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {editMode.published_on && (
            <div className={classes.flexDiv}>
              <TextField
                type="datetime-local"
                variant="outlined"
                size="small"
                defaultValue={published_on.replace(" ", "T")}
                onChange={(e) =>
                  setNewValues({
                    ...newValues,
                    published_on: e.target.value.replace("T", " "),
                  })
                }
              />
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="primary"
                onClick={() => handleOkButton("published_on")}
              >
                ok
              </Button>
              <bold s>/</bold>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="secondary"
                onClick={() => toggleEditMode("published_on")}
              >
                Cancel
              </Button>
            </div>
          )}
          {/* Label - popular | treanding */}
          <div className={classes.flexDiv}>
            <LabelImportantIcon className={classes.icon} />
            Product label:
            <span className={classes.boldFont}>{label ? label : "none"}</span>
            {!editMode.label && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => toggleEditMode("label")}
              >
                <CreateIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {editMode.label && (
            <div className={classes.flexDiv}>
              <TextField
                type="text"
                variant="outlined"
                size="small"
                defaultValue={label}
                onChange={(e) =>
                  setNewValues({
                    ...newValues,
                    label: e.target.value,
                  })
                }
              />
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="primary"
                onClick={() => handleOkButton("label")}
              >
                ok
              </Button>
              <bold s>/</bold>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="secondary"
                onClick={() => toggleEditMode("label")}
              >
                Cancel
              </Button>
            </div>
          )}
          {/* Symbol - meat | veg */}
          <div className={classes.flexDiv}>
            <LineStyleIcon className={classes.icon} />
            Product symbol (imp ! Meat or Veg):
            <span className={classes.boldFont}>{symbol ? symbol : "none"}</span>
            {!editMode.symbol && (
              <IconButton
                size="small"
                color="primary"
                onClick={() => toggleEditMode("symbol")}
              >
                <CreateIcon fontSize="small" />
              </IconButton>
            )}
          </div>
          {editMode.symbol && (
            <div className={classes.flexDiv}>
              <FormControl size="small">
                <Select
                  variant="outlined"
                  defaultValue={symbol}
                  onChange={(e) =>
                    setNewValues({
                      ...newValues,
                      symbol: e.target.value,
                    })
                  }
                >
                  <MenuItem value="">None</MenuItem>
                  <MenuItem value="meat" className={classes.flexDiv}>
                    <FiberManualRecordIcon
                      style={{
                        border: "2px solid red",
                        color: "red",
                        padding: "2px",
                        marginRight: "12px",
                        fontSize: "12px",
                      }}
                    />
                    Meat
                  </MenuItem>
                  <MenuItem value="veg" className={classes.flexDiv}>
                    <FiberManualRecordIcon
                      style={{
                        border: "2px solid green",
                        color: "green",
                        padding: "2px",
                        marginRight: "12px",
                        fontSize: "12px",
                      }}
                    />
                    Vegetarian
                  </MenuItem>
                </Select>
              </FormControl>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="primary"
                onClick={() => handleOkButton("symbol")}
              >
                ok
              </Button>
              <bold s>/</bold>
              <Button
                className={classes.btnSmall}
                variant="outlined"
                color="secondary"
                onClick={() => toggleEditMode("symbol")}
              >
                Cancel
              </Button>
            </div>
          )}

          {/* is featured */}
          <FormControlLabel
            control={
              <Checkbox
                checked={is_featured === 0 ? false : true}
                onChange={(e) =>
                  handleProductData("is_featured", e.target.checked ? 1 : 0)
                }
                color="primary"
              />
            }
            label="This is a featured product"
          />
        </CardContent>
        <CardContent className={classes.otherGrid}>
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <div className={classes.flexRowDiv2}>
                <Link onClick={copyToNewDraft}>Copy to a new draft</Link>
                {is_trashed === 1 ? (
                  <Link
                    color="secondary"
                    onClick={() => handleProductData("is_trashed", 0)}
                  >
                    Restore from trash
                  </Link>
                ) : (
                  <Link
                    color="secondary"
                    onClick={() => handleProductData("is_trashed", 1)}
                  >
                    Move to trash
                  </Link>
                )}
              </div>
            </Grid>
            <Grid item xs={4}>
              <div className={classes.flexRowDiv2}>
                <ButtonProgress
                  fullWidth
                  variant="contained"
                  size="small"
                  color="primary"
                  loading={updateBtnLoader}
                  handleButtonClick={updateData}
                  name="Update"
                />
                <Button
                  fullWidth
                  size="small"
                  variant="outlined"
                  color="primary"
                >
                  Preview
                </Button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
}

export default PublishMain;
