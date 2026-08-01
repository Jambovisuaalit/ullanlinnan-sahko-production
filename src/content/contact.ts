import type { ContactFields } from "@/lib/contact-schema";

export const contactTopicOptions = [
  {
    value: "electrical",
    label: "Sähköasennus tai sähkövika",
    hint: "Kerro kohde, havainto ja mahdolliset aiemmat muutokset.",
    needsAddress: true
  },
  {
    value: "lamp-repair",
    label: "Valaisimen korjaus",
    hint: "Kerro valaisimesta, viasta ja näkyvistä merkinnöistä.",
    needsAddress: false
  },
  {
    value: "product-enquiry",
    label: "Tuote- tai saatavuustiedustelu",
    hint: "Kerro tuotteen nimi, mitat, kanta tai muut tunnistetiedot.",
    needsAddress: false
  },
  {
    value: "business",
    label: "Taloyhtiö tai yritys",
    hint: "Kerro kohde, yhteyshenkilön rooli ja työn käytännön tarve.",
    needsAddress: true
  },
  {
    value: "other",
    label: "Muu asia",
    hint: "Kuvaile asia omin sanoin.",
    needsAddress: false
  }
] as const satisfies readonly {
  value: ContactFields["topic"];
  label: string;
  hint: string;
  needsAddress: boolean;
}[];

export const contactTopicLabels = Object.fromEntries(
  contactTopicOptions.map((option) => [option.value, option.label])
) as Record<ContactFields["topic"], string>;

export const contactTopicHints = Object.fromEntries(
  contactTopicOptions.map((option) => [option.value, option.hint])
) as Record<ContactFields["topic"], string>;
