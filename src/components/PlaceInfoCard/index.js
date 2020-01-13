import React from "react";
// import { Image } from "react-native";
import {
  Card,
  Text,
  CardHeader,
  Popover,
  ListItem,
  Button,
  Icon,
  Layout
} from "@ui-kitten/components";

import styles from "./styles";

// export const CustomHeader = (name) => (
//   <React.Fragment>
//     {/* <Image
//       style={styles.headerImage}
//       source={{
//         uri:
//           "https://cdn.pixabay.com/photo/2017/01/20/00/30/maldives-1993704__340.jpg"
//       }}
//     /> */}
//     <Text style={styles.headerText} category="h6">
//       Maldives
//     </Text>
//   </React.Fragment>
// );

const Info = ({ place }) => {
  return (
    <Card
      header={() => (
        <CardHeader
          titleStyle={styles.cardHeaderTitleStyle}
          title={place.name}
        />
      )}
      status="info"
    >
      <Text style={styles.cardContentText}>
        <Text style={styles.cardContentTitleText}>{`SĐT: `}</Text>
        {`${place.mobile}`}
      </Text>
      <Text style={styles.cardContentText}>
        <Text style={styles.cardContentTitleText}>{`Địa chỉ: `}</Text>
        {`${getFullAddress(place)}`}
      </Text>
    </Card>
  );
};

const GoIcon = style => <Icon {...style} name="arrowhead-right" />;

export default PlaceInfoCard = props => {
  const { place, index, dispatch } = props;

  const [visible, setVisible] = React.useState(false);

  const togglePopover = () => {
    setVisible(!visible);
  };

  const choosePlace = () => {
    dispatch({ type: "auth/change_placesId", payload: { placesId: place.id } });
  };

  const renderItemAccessory = style => (
    <Button
      style={{ borderRadius: 50 }}
      size="medium"
      appearance="filled"
      status="info"
      icon={GoIcon}
      onPress={choosePlace}
    />
  );

  const renderItemIcon = style => <Icon {...style} name="home-outline" />;

  return (
    <Popover
      visible={visible}
      placement="top start"
      content={<Info place={place} />}
      onBackdropPress={togglePopover}
    >
      <ListItem
        style={styles.listItem}
        title={`${place.name}`}
        icon={renderItemIcon}
        accessory={renderItemAccessory}
        onPress={togglePopover}
      />
    </Popover>
  );
};

const getFullAddress = place => {
  const wards = place.wards || {};
  const districts = wards.districts || {};
  const provinces = districts.provinces || {};

  return `${place.address}, ${wards.name || null}, ${districts.name ||
    null}, ${provinces.name || null}`;
};
