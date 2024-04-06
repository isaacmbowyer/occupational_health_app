import {
  AccordionTrigger,
  AccordionHeader,
  AccordionTitleText,
  AccordionIcon,
  AccordionItem,
  AccordionContent,
  Accordion as GluestackAccordion,
} from "@gluestack-ui/themed";
import { ReactNode } from "react";
import { ICONS } from "../../../data/icons";

interface IAccordion {
  title: string;
  hiddenSection: ReactNode;
}

export const Accordion = ({ title, hiddenSection }: IAccordion) => {
  return (
    <GluestackAccordion
      m="$5"
      width="$full"
      size="md"
      variant="unfilled"
      type="single"
      isCollapsible={true}
      isDisabled={false}
    >
      <AccordionItem value="a">
        <AccordionHeader>
          <AccordionTrigger>
            {({ isExpanded }) => {
              return (
                <>
                  <AccordionTitleText>{title}</AccordionTitleText>
                  {isExpanded ? (
                    <AccordionIcon as={ICONS.CHEVRON_UP} ml="$3" />
                  ) : (
                    <AccordionIcon as={ICONS.CHEVRON_DOWN} ml="$3" />
                  )}
                </>
              );
            }}
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>{hiddenSection}</AccordionContent>
      </AccordionItem>
    </GluestackAccordion>
  );
};
