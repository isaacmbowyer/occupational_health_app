import { VStack } from "@gluestack-ui/themed";
import { PrivateTemplateContainer } from "../../components/templates/PrivateTemplateContainer";
import { MainHeader } from "../../components/modules/MainHeader";
import { HorizitonalCard } from "../../components/modules/HorizontalCard";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ICONS } from "../../data/icons";
import { useCurrentEntityContext } from "../../contexts/useCurrentEntityContext";
import { IWorkResourceType } from "../../entities/IWorkResourceType";

export const WorkResourcesScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { setCurrentWorkResource } = useCurrentEntityContext();

  const handleOnView = (resourceType: IWorkResourceType) => {
    setCurrentWorkResource(resourceType);
    navigation.navigate("Work Resource");
  };

  return (
    <PrivateTemplateContainer
      scrollable
      mainSection={
        <VStack space="xl">
          <MainHeader title="Work Resources" isFetching={false} />

          <HorizitonalCard
            label="Employee Rights"
            buttonLabel="View"
            description="Understand employer obligations regarding long COVID accommodations and workplace safety."
            image={require("../../../assets/personal-profile.png")}
            icon={ICONS.CHEVRON_RIGHT}
            handleOnPress={() => handleOnView("Employee Rights")}
          />

          <HorizitonalCard
            label="Employer Rights"
            buttonLabel="View"
            description="Learn about rights regarding accommodations, discrimination protection, and workplace safety."
            image={require("../../../assets/notifications.png")}
            icon={ICONS.CHEVRON_RIGHT}
            handleOnPress={() => handleOnView("Employer Rights")}
          />

          <HorizitonalCard
            label="Workplace Adjustments"
            buttonLabel="View"
            description="Discover ways to modify the workplace to accommodate employees with long COVID."
            image={require("../../../assets/logout.png")}
            icon={ICONS.CHEVRON_RIGHT}
            handleOnPress={() => handleOnView("Workplace Adjustments")}
          />

          <HorizitonalCard
            label="Disibility Entitlements"
            buttonLabel="View"
            description="Explore benefits and entitlements available to individuals with long COVID-related disabilities."
            image={require("../../../assets/logout.png")}
            icon={ICONS.CHEVRON_RIGHT}
            handleOnPress={() => handleOnView("Disibility Entitlements")}
          />

          <HorizitonalCard
            label="Mental Health Support"
            buttonLabel="View"
            description="Find resources and guidance for coping with mental health challenges related to long COVID."
            image={require("../../../assets/logout.png")}
            icon={ICONS.CHEVRON_RIGHT}
            handleOnPress={() => handleOnView("Mental Health Support")}
          />

          <HorizitonalCard
            label="Financial Support"
            buttonLabel="View"
            description="Access information on financial assistance available for individuals affected by long COVID."
            image={require("../../../assets/logout.png")}
            icon={ICONS.CHEVRON_RIGHT}
            handleOnPress={() => handleOnView("Financial Support")}
          />
        </VStack>
      }
    />
  );
};
