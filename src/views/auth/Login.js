import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Pressable,
} from "react-native";
import React from "react";
import InputForm from "../../components/auth/InputForm";
import colorCollection from "../../utils/global/colors";
import { Icon } from "react-native-elements";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { useLoginMutation } from "../../app/services/authService";
import { loginSchema } from "../../utils/validation/authSchema";
import ButtonForm from "../../components/auth/ButtonForm";
import { useNavigation } from "@react-navigation/native";
import NavigationButtons from "../../components/navigation/NavigationButtons";
import { setUser } from "../../features/auth/authSlice";
import { insertSession, deleteSession } from "../../utils/db";

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [triggerLogin] = useLoginMutation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const onSubmit = async () => {
    try {
      loginSchema.validateSync({ email, password });
      const { data } = await triggerLogin({ email, password });
      deleteSession();
      insertSession(data);
      dispatch(
        setUser({
          email: data.email,
          idToken: data.idToken,
          localId: data.localId,
        })
      );
      navigation.navigate("Home");
    } catch (error) {
      setErrorEmail("");
      setErrorPassword("");

      switch (error.path) {
        case "email":
          setErrorEmail(error.message);
          break;
        case "password":
          setErrorPassword(error.message);
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={styles.container}>
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
            <Text style={styles.titleText}>LOGIN</Text>
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
        </View>
        <View style={styles.buttonGroup}>
          <ButtonForm title={"SIGN IN"} onPress={onSubmit} isGoogle={false} />
          <ButtonForm
            title={"SIGN IN WITH GOOGLE"}
            onPress={""}
            isGoogle={true}
          />
          <Pressable
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={styles.subLink}>
              You dont have an account? Sign up
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {
              navigation.navigate("Recovery");
            }}
          >
            <Text style={styles.subLink}>You dont remember your password?</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Login;

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
