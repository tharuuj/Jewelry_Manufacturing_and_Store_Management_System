import * as React from "react";

import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

export default function Review({
  products,
  firstName,
  lastName,
  address,
  contactNo1,
  email,
  city,
  state,
  zipCode,
  country,
  paymentType,
  cardNumber,
  expirationDate,
  cardName,
  reference,
}) {
  return (
    <Stack spacing={2}>
      <List disablePadding>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Products" secondary="4 selected" />
          <Typography variant="body2">Rs.183,500.00</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Shipping" secondary="Plus taxes" />
          <Typography variant="body2">Rs.2550.00</Typography>
        </ListItem>
        <ListItem sx={{ py: 1, px: 0 }}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          Rs.185,000.00
          </Typography>
        </ListItem>
      </List>
      <Divider />
      <Stack
        direction="column"
        divider={<Divider flexItem />}
        spacing={2}
        sx={{ my: 2 }}
      >
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Shipment details
          </Typography>
          <Typography gutterBottom>
            {firstName} {lastName}
          </Typography>
          <Typography color="text.secondary" gutterBottom>
            {address}
          </Typography>
          <Typography gutterBottom>{contactNo1}</Typography>
          <Typography gutterBottom>{email}</Typography>
          <Typography gutterBottom>{city}</Typography>
          <Typography gutterBottom>{state}</Typography>
          <Typography gutterBottom>{zipCode}</Typography>
          <Typography gutterBottom>{country}</Typography>
        </div>
        <div>
          <Typography variant="subtitle2" gutterBottom>
            Payment details
          </Typography>
          <Grid container>
            {paymentType === "creditCard" ? (
              <>
                <React.Fragment>
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ width: "100%", mb: 1 }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Card Type
                    </Typography>
                    <Typography variant="body2">Visa</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ width: "100%", mb: 1 }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Card Holder
                    </Typography>
                    <Typography variant="body2">{cardName}</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ width: "100%", mb: 1 }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Card Number
                    </Typography>
                    <Typography variant="body2">{cardNumber}</Typography>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ width: "100%", mb: 1 }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Expire
                    </Typography>
                    <Typography variant="body2">{expirationDate}</Typography>
                  </Stack>
                </React.Fragment>
              </>
            ) : (
              <>
                <React.Fragment>
                  <Stack
                    direction="row"
                    spacing={1}
                    useFlexGap
                    sx={{ width: "100%", mb: 1 }}
                  >
                    <Typography variant="body1" color="text.secondary">
                      Refrence Number
                    </Typography>
                    <Typography variant="body2">{reference}</Typography>
                  </Stack>
                </React.Fragment>
              </>
            )}
          </Grid>
        </div>
      </Stack>
    </Stack>
  );
}
