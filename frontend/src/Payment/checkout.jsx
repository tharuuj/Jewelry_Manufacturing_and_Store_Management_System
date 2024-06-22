import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

import AddressForm from "./AddressForm";
import getCheckoutTheme from "./getCheckoutTheme";
import Info from "./Info";
import InfoMobile from "./InfoMobile";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import ToggleColorMode from "./ToggleColorMode";

import { Newcheckout } from "./actions/checkout_action";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";

const steps = ["Shipping address", "Payment details", "Review your order"];

const products = [
  {
    name: "Ring",
    desc: "size 5",
    price: "Rs.45,550.00",
  },
  {
    name: "Bracelet",
    desc: "size 12",
    price: "Rs.125,000.00",
  },
  {
    name: "Polishing",
    desc: "monthly",
    price: "Rs 12,550.00",
  },
  {
    name: "Tax",
    desc: "goverment",
    price: "Rs.2,550.00",
  },
];

export default function Checkout() {

 


  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            method={method}
            setMethod={setMethod}
            saveAddress={saveAddress}
            setSaveAddress={setSaveAddress}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            address={address}
            setAddress={setAddress}
            contactNo1={contactNo1}
            setContactNo1={setContactNo1}
            email={email}
            setEmail={setEmail}
            city={city}
            setCity={setCity}
            state={state}
            setState={setState}
            zipCode={zipCode}
            setZipCode={setZipCode}
            country={country}
            setCountry={setCountry}
            firstName2={firstName2}
            setFirstName2={setFirstName2}
            lastName2={lastName2}
            setLastName2={setLastName2}
            contactNo2={contactNo2}
            setContactNo2={setContactNo2}
            email2={email2}
            setEmail2={setEmail2}
          />
        );
      case 1:
        return (
          <PaymentForm
            paymentType={paymentType}
            setPaymentType={setPaymentType}
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            cvv={cvv}
            setCvv={setCvv}
            expirationDate={expirationDate}
            setExpirationDate={setExpirationDate}
            cardName={cardName}
            setCardName={setCardName}
            reference={reference}
            setReference={setReference}
          />
        );
      case 2:
        return (
          <Review
            products={products}
            firstName={firstName}
            lastName={lastName}
            address={address}
            contactNo1={contactNo1}
            email={email}
            city={city}
            state={state}
            zipCode={zipCode}
            country={country}
            paymentType={paymentType}
            cardNumber={cardNumber}
            expirationDate={expirationDate}
            cardName={cardName}
            reference={reference}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  const dispatch = useDispatch();
  const loading = useSelector((state) => state.checkout.loading);
  const display = useSelector((state) => state.checkout.display);

  console.log(display);

  useEffect(() => {
    if (loading === true) {
      toast.loading("Loading...", {
        id: "loading",
      });
    } else if (loading === false) {
      toast.dismiss("loading");
    }
  }, [loading]);

  const [mode, setMode] = useState("light");
  const [showCustomTheme, setShowCustomTheme] = useState(true);
  const checkoutTheme = createTheme(getCheckoutTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const [activeStep, setActiveStep] = useState(0);

  //form status
  const [method, setMethod] = useState("Delivery");
  const [saveAddress, setSaveAddress] = useState(true);

  //address form
  const [OID, setOID] = useState("OID_455236");
  const [Products, setProducts] = useState('');
  const[user,setuser_id]=useState(JSON.parse(localStorage.getItem('user')));
  const [UID, setUID] = useState(user._id);
  const [firstName, setFirstName] = useState(user.name);
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNo1, setContactNo1] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [firstName2, setFirstName2] = useState("");
  const [lastName2, setLastName2] = useState("");
  const [contactNo2, setContactNo2] = useState("");
  const [email2, setEmail2] = useState("");

  // payment form
  const [paymentType, setPaymentType] = useState("creditCard");
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cardName, setCardName] = useState("");
  const [reference, setReference] = useState("");

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleNext = () => {
    setActiveStep(activeStep + 1);

    //form submit function
    if (activeStep === steps.length - 1) {
      let form;

      //form validation part
      if (method === "Delivery" && saveAddress === true) {
        if (
          firstName !== "" &&
          lastName !== "" &&
          address !== "" &&
          contactNo1 !== "" &&
          email !== "" &&
          city !== "" &&
          state !== "" &&
          zipCode !== "" &&
          country !== ""
        ) {
          form = {
            method: method,
            saveAddress: saveAddress,
            OID: OID,
            UID: UID,
            firstName: firstName,
            lastName: lastName,
            address: address,
            contactNo1: contactNo1,
            email: email,
            city: city,
            state: state,
            zipCode: zipCode,
            country: country,
            firstName2: firstName2,
            lastName2: lastName2,
            contactNo2: contactNo2,
            email2: email2,
            paymentType: paymentType,
            cardNumber: cardNumber,
            CVV: cvv,
            Expire: expirationDate,
            CardName: cardName,
            reference: reference,
          };

          //Creating order






          dispatch(Newcheckout(form));
        } else {
          toast.error("Fill Required fields in address form..!", {
            id: "addresserror1",
          });
        }
      } else if (method === "Delivery" && saveAddress === false) {
        if (
          firstName2 !== "" &&
          lastName2 !== "" &&
          contactNo2 !== "" &&
          email2 !== ""
        ) {
          form = {
            method: method,
            saveAddress: saveAddress,
            OID: OID,
            UID: UID,
            firstName: firstName,
            lastName: lastName,
            address: address,
            contactNo1: contactNo1,
            email: email,
            city: city,
            state: state,
            zipCode: zipCode,
            country: country,
            firstName2: firstName2,
            lastName2: lastName2,
            contactNo2: contactNo2,
            email2: email2,
            paymentType: paymentType,
            cardNumber: cardNumber,
            CVV: cvv,
            Expire: expirationDate,
            CardName: cardName,
            reference: reference,
          };
          dispatch(Newcheckout(form));
        } else {
          toast.error("Fill Required fields in address form..!", {
            id: "addresserror2",
          });
        }
      } else if (method !== "Delivery") {
        if (
          firstName !== "" &&
          lastName !== "" &&
          address !== "" &&
          contactNo1 !== "" &&
          email !== ""
        ) {
          form = {
            method: method,
            saveAddress: saveAddress,
            OID: OID,
            UID: UID,
            firstName: firstName,
            lastName: lastName,
            address: address,
            contactNo1: contactNo1,
            email: email,
            city: city,
            state: state,
            zipCode: zipCode,
            country: country,
            firstName2: firstName2,
            lastName2: lastName2,
            contactNo2: contactNo2,
            email2: email2,
            paymentType: paymentType,
            cardNumber: cardNumber,
            CVV: cvv,
            Expire: expirationDate,
            CardName: cardName,
            reference: reference,
          };
          dispatch(Newcheckout(form));
        } else {
          toast.error("Fill Required fields in address form..!", {
            id: "addresserror3",
          });
        }
      } else if (
        method === "Delivery" &&
        saveAddress === true &&
        paymentType === "creditCard"
      ) {
        if (
          cardNumber !== "" &&
          cvv !== "" &&
          cardName !== "" &&
          expirationDate !== ""
        ) {
          form = {
            method: method,
            saveAddress: saveAddress,
            OID: OID,
            UID: UID,
            firstName: firstName,
            lastName: lastName,
            address: address,
            contactNo1: contactNo1,
            email: email,
            city: city,
            state: state,
            zipCode: zipCode,
            country: country,
            firstName2: firstName2,
            lastName2: lastName2,
            contactNo2: contactNo2,
            email2: email2,
            paymentType: paymentType,
            cardNumber: cardNumber,
            CVV: cvv,
            Expire: expirationDate,
            CardName: cardName,
            reference: reference,
          };
          dispatch(Newcheckout(form));
        } else {
          toast.error("Fill required fields in credit card form..!", {
            id: "paymenterror4",
          });
        }
      } else if (
        method === "Delivery" &&
        saveAddress === true &&
        paymentType !== "creditCard"
      ) {
        if (
          reference !== ''
        ) {
          form = {
            method: method,
            saveAddress: saveAddress,
            OID: OID,
            UID: UID,
            firstName: firstName,
            lastName: lastName,
            address: address,
            contactNo1: contactNo1,
            email: email,
            city: city,
            state: state,
            zipCode: zipCode,
            country: country,
            firstName2: firstName2,
            lastName2: lastName2,
            contactNo2: contactNo2,
            email2: email2,
            paymentType: paymentType,
            cardNumber: cardNumber,
            CVV: cvv,
            Expire: expirationDate,
            CardName: cardName,
            reference: reference,
          };
          dispatch(Newcheckout(form));
        } else {
          toast.error("Fill required fields in bank refrence form..!", {
            id: "paymenterror5",
          });
        }
      }
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={showCustomTheme ? checkoutTheme : defaultTheme}>
      <CssBaseline />
      <Grid container sx={{ height: { xs: "100%", sm: "100dvh" } }}>
        <Grid
          item
          xs={12}
          sm={5}
          lg={4}
          sx={{
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            backgroundColor: "background.paper",
            borderRight: { sm: "none", md: "1px solid" },
            borderColor: { sm: "none", md: "divider" },
            alignItems: "start",
            pt: 4,
            px: 10,
            gap: 4,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "end",
              height: 150,
            }}
          >
            <Button
              startIcon={<ArrowBackRoundedIcon />}
              component="a"
              href="/"
              sx={{ ml: "-8px" }}
            >
              Back to
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: 500,
            }}
          >
            <Info totalPrice={"Rs.185,000.00"} products={products} />
          </Box>
        </Grid>
        <Grid
          item
          sm={12}
          md={7}
          lg={8}
          sx={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "100%",
            width: "100%",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            alignItems: "start",
            pt: { xs: 2, sm: 4 },
            px: { xs: 2, sm: 10 },
            gap: { xs: 4, md: 8 },
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: { sm: "space-between", md: "flex-end" },
              alignItems: "center",
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
            }}
          >
            <Box
              sx={{
                display: { xs: "flex", md: "none" },
                flexDirection: "row",
                width: "100%",
                justifyContent: "space-between",
              }}
            >
              <Button
                startIcon={<ArrowBackRoundedIcon />}
                component="a"
                href="/"
                sx={{ alignSelf: "start" }}
              >
                Back to
              </Button>
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "flex-end",
                flexGrow: 1,
                height: 150,
              }}
            >
              <ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />
              <Stepper
                id="desktop-stepper"
                activeStep={activeStep}
                sx={{
                  width: "100%",
                  height: 40,
                }}
              >
                {steps.map((label) => (
                  <Step
                    sx={{
                      ":first-child": { pl: 0 },
                      ":last-child": { pr: 0 },
                    }}
                    key={label}
                  >
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </Box>
          <Card
            sx={{
              display: { xs: "flex", md: "none" },
              width: "100%",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                justifyContent: "space-between",
                ":last-child": { pb: 2 },
              }}
            >
              <div>
                <Typography variant="subtitle2" gutterBottom>
                  Selected products
                </Typography>
                <Typography variant="body1">
                  {activeStep >= 2 ? "Rs.185,000.00" : "Rs.183,500.00"}
                </Typography>
              </div>
              <InfoMobile
                totalPrice={activeStep >= 2 ? "Rs.185,000.00" : "Rs.183,500.00"}
              />
            </CardContent>
          </Card>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              flexGrow: 1,
              width: "100%",
              maxWidth: { sm: "100%", md: 600 },
              maxHeight: "720px",
              gap: { xs: 5, md: "none" },
            }}
          >
            <Stepper
              id="mobile-stepper"
              activeStep={activeStep}
              alternativeLabel
              sx={{ display: { sm: "flex", md: "none" } }}
            >
              {steps.map((label) => (
                <Step
                  sx={{
                    ":first-child": { pl: 0 },
                    ":last-child": { pr: 0 },
                    "& .MuiStepConnector-root": { top: { xs: 6, sm: 12 } },
                  }}
                  key={label}
                >
                  <StepLabel
                    sx={{
                      ".MuiStepLabel-labelContainer": { maxWidth: "70px" },
                    }}
                  >
                    {label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>
            {activeStep === steps.length ? (
              <>
                {display === true && (
                  <>
                    <Stack spacing={2} useFlexGap>
                      <Typography variant="h1">📦</Typography>
                      <Typography variant="h5">
                        Thank you for your order!
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        Your order is confiremed and will update you soon.
                      </Typography>
                      <Button
                        variant="contained"
                        sx={{
                          alignSelf: "start",
                          width: { xs: "100%", sm: "auto" },
                        }}
                        href="/orderTracking"
                      >
                        Go to my orders
                      </Button>
                    </Stack>
                  </>
                )}
              </>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                    justifyContent:
                      activeStep !== 0 ? "space-between" : "flex-end",
                    alignItems: "end",
                    flexGrow: 1,
                    gap: 1,
                    pb: { xs: 12, sm: 0 },
                    mt: { xs: 2, sm: 0 },
                    mb: "60px",
                  }}
                >
                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="text"
                      sx={{
                        display: { xs: "none", sm: "flex" },
                      }}
                    >
                      Previous
                    </Button>
                  )}

                  {activeStep !== 0 && (
                    <Button
                      startIcon={<ChevronLeftRoundedIcon />}
                      onClick={handleBack}
                      variant="outlined"
                      fullWidth
                      sx={{
                        display: { xs: "flex", sm: "none" },
                      }}
                    >
                      Previous
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    endIcon={<ChevronRightRoundedIcon />}
                    onClick={handleNext}
                    sx={{
                      width: { xs: "100%", sm: "fit-content" },
                    }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
