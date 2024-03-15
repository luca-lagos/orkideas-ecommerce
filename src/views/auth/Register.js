import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import InputForm from "../../components/auth/InputForm";
import colorCollection from "../../utils/global/colors";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useRegisterMutation } from "../../app/services/authService";
import { registerSchema } from "../../utils/validation/authSchema";
import ButtonForm from "../../components/auth/ButtonForm";
import { useNavigation } from "@react-navigation/native";
import { setUser } from "../../features/auth/authSlice";
import NavigationButtons from "../../components/navigation/NavigationButtons";
import Notification from "../../components/notifications/Notification";
import { usePostProfileMutation } from "../../app/services/profileService";
import ImageSelector from "../../components/profile/ImageSelector";
import LocationSelector from "../../components/profile/LocationSelector";

const Register = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const [userImage, setUserImage] = useState("");
  const [location, setLocation] = useState({});
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorFullname, setErrorFullname] = useState("");
  const [triggerRegister] = useRegisterMutation();
  const [triggerProfile] = usePostProfileMutation();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [notification, setNotification] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(null);
  const [navigate, setNavigate] = useState(null);

  console.log(userImage, location);

  const onSubmit = async () => {
    try {
      registerSchema.validateSync({
        fullname,
        email,
        password,
        confirmPassword,
      });
      if (
        (fullname !== "" || undefined) &&
        (userImage !== "" || undefined) &&
        (location !== "" || undefined)
      ) {
        const { data } = await triggerRegister({ email, password });
        const newProfile = {
          id: data.localId,
          fullname: fullname,
          userImage: "",
          location: "",
        };
        triggerProfile({ newProfile });
        dispatch(
          setUser({
            email: data.email,
            idToken: data.idToken,
            localId: data.localId,
          })
        );
        setNotification(true);
        setTitle("Account registered successfully");
        setSuccess(true);
        setError(false);
        setNavigate("Login");
      }
    } catch (error) {
      setErrorEmail("");
      setErrorPassword("");
      setErrorConfirmPassword("");
      setErrorFullname("");

      switch (error.path) {
        case "email":
          setErrorEmail(error.message);
          break;
        case "password":
          setErrorPassword(error.message);
          break;
        case "confirmPassword":
          setErrorPassword(error.message);
          break;
        case "fullname":
          setErrorPassword(error.message);
          break;
        default:
          break;
      }
    }
  };

  return (
    <>
      <View style={styles.container}>
        <NavigationButtons />
        <ScrollView>
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
                <Text style={styles.titleText}>REGISTER</Text>
              </View>
            </ImageBackground>
            <View style={styles.formGroup}>
              <InputForm
                label="Fullname"
                value={fullname}
                onChangeText={(t) => setFullname(t)}
                isSecure={false}
                error={errorFullname}
              />
              <InputForm
                label="Email"
                value={email}
                onChangeText={(t) => setEmail(t)}
                isSecure={false}
                error={errorEmail}
              />
              <View style={styles.passwordInput}>
                <InputForm
                  label="Password"
                  value={password}
                  onChangeText={(t) => setPassword(t)}
                  isSecure={passwordVisible}
                  error={errorPassword}
                />
                <Pressable
                  style={styles.passwordIcon}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                >
                  <Icon
                    name={passwordVisible ? "visibility" : "visibility-off"}
                    size={35}
                    color={colorCollection.darkviolet}
                  />
                </Pressable>
              </View>
              <View style={styles.passwordInput}>
                <InputForm
                  label="Confirm password"
                  value={confirmPassword}
                  onChangeText={(t) => setConfirmPassword(t)}
                  isSecure={confirmPasswordVisible}
                  error={errorConfirmPassword}
                />
                <Pressable
                  style={styles.passwordIcon}
                  onPress={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                >
                  <Icon
                    name={
                      confirmPasswordVisible ? "visibility" : "visibility-off"
                    }
                    size={35}
                    color={colorCollection.darkviolet}
                  />
                </Pressable>
              </View>
              <ImageSelector image={userImage} passImage={setUserImage} />
              <LocationSelector
                location={location}
                passLocation={setLocation}
              />
            </View>
            <View style={styles.buttonGroup}>
              <ButtonForm
                title={"SIGN UP"}
                onPress={onSubmit}
                isGoogle={false}
              />
              <Pressable
                onPress={() => {
                  navigation.navigate("Login");
                }}
              >
                <Text style={styles.subLink}>You have an account? Sign in</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
      <Notification
        modalVisible={notification}
        title={title}
        navigate={navigate}
        onSuccess={success}
        onError={error}
      />
    </>
  );
};

export default Register;

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
