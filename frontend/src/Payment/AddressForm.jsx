import React, { useState } from "react";
import { FormControl, Radio, RadioGroup } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/system";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function AddressForm({
  method,
  setMethod,
  saveAddress,
  setSaveAddress,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  address,
  setAddress,
  contactNo1,
  setContactNo1,
  email,
  setEmail,
  city,
  setCity,
  state,
  setState,
  zipCode,
  setZipCode,
  country,
  setCountry,
  firstName2,
  setFirstName2,
  lastName2,
  setLastName2,
  contactNo2,
  setContactNo2,
  email2,
  setEmail2,
}) {
  return (
    <Grid container spacing={3}>
      <FormGrid item xs={12} md={12}>
        <RadioGroup
          aria-label="options"
          name="options"
          style={{ display: "flex", flexDirection: "row" }}
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        >
          <FormControlLabel
            value="Delivery"
            control={<Radio />}
            label="Delivery"
          />
          <FormControlLabel
            value="Store Pickup"
            control={<Radio />}
            label="Store Pickup"
          />
        </RadioGroup>
      </FormGrid>
      {method === "Delivery" ? (
        <>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="first-name">First name</FormLabel>
            <OutlinedInput
              id="first-name"
              name="first-name"
              type="name"
              placeholder="John"
              autoComplete="first name"
              required={method === "Delivery"}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="last-name">Last name</FormLabel>
            <OutlinedInput
              id="last-name"
              name="last-name"
              type="last-name"
              placeholder="Snow"
              autoComplete="last name"
              required={method === "Delivery"}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormGrid>
          <FormGrid item xs={12}>
            <FormLabel htmlFor="address1">Address line</FormLabel>
            <OutlinedInput
              id="address1"
              name="address1"
              type="address1"
              placeholder="Street name and number"
              autoComplete="shipping address-line1"
              required={method === "Delivery"}
              value={address}
              onChange={(e)=> {setAddress(e.target.value)}}
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="contact number">Contact Number</FormLabel>
            <OutlinedInput
              id="contactNo"
              name="contactNo"
              type="contactNo"
              placeholder="Contact Number"
              autoComplete="Contact Number"
              required={method === "Delivery"}
              value={contactNo1}
              onChange={(e)=> {setContactNo1(e.target.value)}}
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="Email address"
              required={method === "Delivery"}
              value={email}
              onChange={(e)=> {setEmail(e.target.value)}}
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="city">City</FormLabel>
            <OutlinedInput
              id="city"
              name="city"
              type="city"
              placeholder="New York"
              autoComplete="City"
              required={method === "Delivery"}
              value={city}
              onChange={(e)=> {setCity(e.target.value)}}
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="state">State</FormLabel>
            <OutlinedInput
              id="state"
              name="state"
              type="state"
              placeholder="NY"
              autoComplete="State"
              required={method === "Delivery"}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="zip">Zip / Postal code</FormLabel>
            <OutlinedInput
              id="zip"
              name="zip"
              type="zip"
              placeholder="12345"
              autoComplete="shipping postal-code"
              required={method === "Delivery"}
              value={zipCode}
              onChange={(e)=> {setZipCode(e.target.value)}}
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="country">Country</FormLabel>
            <OutlinedInput
              id="country"
              name="country"
              type="country"
              placeholder="United States"
              autoComplete="shipping country"
              required={method === "Delivery"}
              value={country}
              onChange={(e)=> {setCountry(e.target.value)}}
            />
          </FormGrid>
          <FormGrid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  name="saveAddress"
                  value="yes"
                  checked={saveAddress}
                  onChange={(e) => setSaveAddress(e.target.checked)}
                />
              }
              label="Use this details for payment details"
            />
          </FormGrid>
          {saveAddress === false ? (
            <>
              <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="first-name">First name</FormLabel>
                <OutlinedInput
                  id="first-name"
                  name="first-name"
                  type="name"
                  autoComplete="first name"
                  required={saveAddress === false}
                  value={firstName2}
                  onChange={(e) => setFirstName2(e.target.value)}
                />
              </FormGrid>
              <FormGrid item xs={12} md={6}>
                <FormLabel htmlFor="last-name">Last name</FormLabel>
                <OutlinedInput
                  id="last-name"
                  name="last-name"
                  type="last-name"
                  placeholder="Snow"
                  autoComplete="last name"
                  required={saveAddress === false}
                  value={lastName2}
                  onChange={(e) => setLastName2(e.target.value)}
                />
              </FormGrid>
              <FormGrid item xs={6}>
                <FormLabel htmlFor="contact number">Contact Number</FormLabel>
                <OutlinedInput
                  id="contactNo"
                  name="contactNo"
                  type="contactNo"
                  placeholder="Contact Number"
                  autoComplete="Contact Number"
                  required={saveAddress === false}
                  value={contactNo2}
                  onChange={(e) => setContactNo2(e.target.value)}
                />
              </FormGrid>
              <FormGrid item xs={6}>
                <FormLabel htmlFor="email">Email</FormLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email"
                  autoComplete="Email address"
                  required={saveAddress === false}
                  value={email2}
                  onChange={(e) => setEmail2(e.target.value)}
                />
              </FormGrid>
            </>
          ) : null}
        </>
      ) : (
        <>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="first-name">First name</FormLabel>
            <OutlinedInput
              id="first-name"
              name="first-name"
              type="name"
              placeholder="John"
              autoComplete="first name"
              required={method !== "Delivery"}
              value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
            />
          </FormGrid>
          <FormGrid item xs={12} md={6}>
            <FormLabel htmlFor="last-name">Last name</FormLabel>
            <OutlinedInput
              id="last-name"
              name="last-name"
              type="last-name"
              placeholder="Snow"
              autoComplete="last name"
              required={method !== "Delivery"}
              value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
            />
          </FormGrid>
          <FormGrid item xs={12}>
            <FormLabel htmlFor="address1">Address line</FormLabel>
            <OutlinedInput
              id="address1"
              name="address1"
              type="address1"
              placeholder="Street name and number"
              autoComplete="shipping address-line1"
              required={method !== "Delivery"}
              value={address}
                  onChange={(e) => setAddress(e.target.value)}
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="contact number">Contact Number</FormLabel>
            <OutlinedInput
              id="contactNo"
              name="contactNo"
              type="contactNo"
              placeholder="Contact Number"
              autoComplete="Contact Number"
              required={method !== "Delivery"}
              value={contactNo1}
                  onChange={(e) => setContactNo1(e.target.value)}
            />
          </FormGrid>
          <FormGrid item xs={6}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <OutlinedInput
              id="email"
              name="email"
              type="email"
              placeholder="Email"
              autoComplete="Email address"
              required={method !== "Delivery"}
              value={email}
                  onChange={(e) => setEmail(e.target.value)}
            />
          </FormGrid>
        </>
      )}
    </Grid>
  );
}
