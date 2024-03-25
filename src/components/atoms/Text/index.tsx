import { Text as GluestackText } from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { IColor } from "../../../entities/IColor";
import { COLORS } from "../../../data/colors";

interface ITextProps {
  children: ReactNode;
  color?: IColor;
  bold?: boolean;
  textAlign?: "left" | "right" | "center";
}

const TextExtraSmall = ({
  children,
  color = "black",
  bold,
  textAlign = "left",
}: ITextProps) => {
  return (
    <GluestackText
      color={COLORS[color]}
      size="2xs"
      fontFamily="sans-serif"
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

const TextSmall = ({
  children,
  color = "black",
  bold,
  textAlign = "left",
}: ITextProps) => {
  return (
    <GluestackText
      color={COLORS[color]}
      size="sm"
      fontFamily="sans-serif"
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

const TextRegular = ({
  children,
  color = "black",
  bold,
  textAlign = "left",
}: ITextProps) => {
  return (
    <GluestackText
      color={COLORS[color]}
      size="md"
      fontFamily="sans-serif"
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

const TextSubHeader = ({
  children,
  color = "black",
  bold,
  textAlign = "left",
}: ITextProps) => {
  return (
    <GluestackText
      color={COLORS[color]}
      size="xl"
      fontFamily="sans-serif"
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

const TextHeader = ({
  children,
  color = "black",
  bold = true,
  textAlign = "left",
}: ITextProps) => {
  return (
    <GluestackText
      color={COLORS[color]}
      size="2xl"
      fontFamily="sans-serif"
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

const TextTitle = ({
  children,
  color = "black",
  bold = true,
  textAlign = "left",
}: ITextProps) => {
  return (
    <GluestackText
      color={COLORS[color]}
      size="3xl"
      fontFamily="sans-serif"
      bold={bold}
      textAlign={textAlign}
    >
      {children}
    </GluestackText>
  );
};

export const Text = {
  ExtraSmall: TextExtraSmall,
  Small: TextSmall,
  Regular: TextRegular,
  SubHeader: TextSubHeader,
  Header: TextHeader,
  Title: TextTitle,
};
