import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
  ScrollView,
} from "react-native";
import React from "react";
import InputForm from "../../components/auth/InputForm";
import colorCollection from "../../utils/global/colors";
import { useState } from "react";
import { useChangePasswordMutation } from "../../app/services/authService";
import { recoverySchema } from "../../utils/validation/authSchema";
import ButtonForm from "../../components/auth/ButtonForm";
import { useNavigation } from "@react-navigation/native";
import NavigationButtons from "../../components/navigation/NavigationButtons";
import Notification from "../../components/notifications/Notification";

const Recovery = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [triggerRecovery] = useChangePasswordMutation();
  const [notification, setNotification] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [info, setInfo] = useState(false);
  const [title, setTitle] = useState(null);
  const [navigate, setNavigate] = useState(null);

  const onSubmit = async () => {
    try {
      recoverySchema.validateSync({ email });
      triggerRecovery({ requestType: "PASSWORD_RESET", email });
      setNotification(true);
      setTitle("Mail sended, please check your inbox");
      setSuccess(false);
      setError(false);
      setInfo(true);
      setNavigate("Login");
    } catch (error) {
      setErrorEmail("");
      switch (error.path) {
        case "email":
          setErrorEmail(error.message);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <NavigationButtons />
        <View style={styles.form}>
          <ImageBackground
            style={styles.titleBanner}
            src="https://www.1800flowers.com/blog/wp-content/uploads/2021/05/Birthday-Flowers-Colors.jpg"
            imageStyle={{
              backgroundColor: colorCollection.textdark,
              opacity: 0.7,
              borderRadius: 10,
            }}
          >
            <View style={styles.titleContainer}>
              <Text style={styles.titleText}>CHANGE PASSWORD</Text>
            </View>
          </ImageBackground>
          <View style={styles.formGroup}>
            <InputForm
              label="Email"
              value={email}
              onChangeText={(t) => setEmail(t)}
              isSecure={false}
              error={errorEmail}
            />
          </View>
          <View style={styles.buttonGroup}>
            <ButtonForm
              title={"SEND MAIL"}
              onPress={onSubmit}
              isGoogle={false}
            />
            <Pressable
              onPress={() => {
                navigation.navigate("Login");
              }}
            >
              <Text style={styles.subLink}>Return to login</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
      <Notification
        modalVisible={notification}
        title={title}
        navigate={navigate}
        onSuccess={success}
        onError={error}
        onInfo={info}
      />
    </>
  );
};

export default Recovery;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colorCollection.lightviolet,
  },
  form: {
    backgroundColor: "white",
    marginVertical: 20,
    marginHorizontal: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
    borderRadius: 10,
    elevation: 5,
  },
  titleBanner: {
    width: "100%",
    height: 80,
    marginBottom: 30,
  },
  titleContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  titleText: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: "white",
  },
  formGroup: {
    marginBottom: 0,
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
  },
  passwordInput: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  passwordIcon: {
    width: "10%",
    marginTop: 5,
  },
  subLink: {
    fontSize: 15,
    textDecorationLine: "none",
  },
});
