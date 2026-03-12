export interface Testimonial {
  name: string;
  title: string;
  company: string;
  quote: string;
  appId?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Derek F.",
    title: "Public Adjuster",
    company: "Foreman Claims Group",
    quote:
      "Appraisly cut our narrative turnaround from a full day to under an hour. The output is clean, professional, and carrier-ready. It's become a non-negotiable part of our workflow.",
    appId: "appraisly",
  },
  {
    name: "Carla V.",
    title: "Field Documentation Lead",
    company: "Vantage Adjusting Co.",
    quote:
      "ImageLablr handles photo organization that used to eat up half our admin time. Consistent labeling, clean exports, and nothing falls through the cracks anymore.",
    appId: "imagelablr",
  },
  {
    name: "Troy M.",
    title: "Restoration Operations Manager",
    company: "Meridian Restore",
    quote:
      "RestoreCam gave our techs a real system in the field. Every job is tracked, every room documented, and our reports go out faster than anything we used before.",
    appId: "restorecam",
  },
  {
    name: "Brianna W.",
    title: "Independent Appraiser",
    company: "Solo Practice",
    quote:
      "Running all three LossStack apps together changed what I can handle in a week. The bundle pricing made the decision easy — it pays for itself on the first file.",
    appId: undefined,
  },
];
