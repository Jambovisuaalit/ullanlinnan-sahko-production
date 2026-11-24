import { z } from "zod";

export const subcontractorSchema = z.object({
  companyName: z.string().trim().min(2, "Kirjoita yrityksen nimi.").max(150, "Nimi on liian pitkä."),
  businessId: z.string().trim().regex(/^\d{7}-\d$/, "Kirjoita Y-tunnus muodossa 1234567-8."),
  contactName: z.string().trim().min(2, "Kirjoita yhteyshenkilön nimi.").max(100),
  phone: z.string().trim().min(5, "Kirjoita puhelinnumero.").max(40),
  email: z.string().trim().email("Kirjoita toimiva sähköpostiosoite.").max(200),
  expertise: z.string().trim().min(5, "Kerro osaamisalueista.").max(600),
  coverageArea: z.string().trim().min(2, "Kerro toiminta-alue.").max(200),
  qualifications: z.string().trim().min(5, "Kerro luvista, pätevyyksistä ja vakuutuksista.").max(1200),
  description: z.string().trim().min(20, "Kuvaile yritystä ja yhteistyötoivetta vähintään 20 merkillä.").max(3000),
  consent: z.boolean().refine((value) => value, { message: "Hyväksy tietojen käsittely hakemuksen käsittelyä varten." }),
  website: z.string().max(200).optional(),
  startedAt: z.coerce.number().int().positive()
});

export type SubcontractorFormInput = z.input<typeof subcontractorSchema>;
export type SubcontractorFields = z.output<typeof subcontractorSchema>;
