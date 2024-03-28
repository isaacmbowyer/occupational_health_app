import { VStack } from "@gluestack-ui/themed";
import { Text } from "../../components/atoms/Text";
import { PublicTemplateContainer } from "../../components/templates/PublicTemplateContainer";
import { PersonalDetails } from "./components/PersonalDetails";
import { PasswordDetails } from "./components/PasswordDetails";
import { CompanyDetails } from "./components/CompanyDetails";
import { Link } from "../../components/atoms/Link";
import { Button } from "../../components/atoms/Button";
import { useCreateAccount } from "./hooks";

export const CreateAccountScreen = ({ navigation }) => {
  const { state, methods } = useCreateAccount();

  return (
    <PublicTemplateContainer
      scrollable
      mainSection={
        <VStack space="md">
          <Text.Header color="sky_blue">Create Account</Text.Header>

          <PersonalDetails
            firstName={state.values.firstName}
            lastName={state.values.lastName}
            email={state.values.email}
            date={state.values.birthDate}
            genderId={state.values.gender}
            firstNameError={state.validationError.firstName}
            lastNameError={state.validationError.lastName}
            emailError={state.validationError.email}
            genderOptions={state.genderOptions}
            handleOnChange={methods.handleOnChange}
          />

          <PasswordDetails
            password={state.values.password}
            confirmPassword={state.values.confirmPassword}
            passwordError={state.validationError.password}
            confirmPasswordError={state.validationError.confirmPassword}
            handleOnChange={methods.handleOnChange}
          />

          <CompanyDetails
            name={state.values.companyName}
            countryId={state.values.country}
            industryId={state.values.industry}
            nameError={state.validationError.companyName}
            countryOptions={state.countryOptions}
            industryOptions={state.industryOptions}
            handleOnChange={methods.handleOnChange}
          />

          <Button.Solid
            text="Create Account"
            onPress={methods.handleSubmit}
            isDisabled={state.isDisabled}
          />

          <VStack alignItems="center" justifyContent="center" mb="$4">
            <Link.Regular label="Return to Home" screen="Home"></Link.Regular>
          </VStack>
        </VStack>
      }
    />
  );
};
