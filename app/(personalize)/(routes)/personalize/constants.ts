import * as z from "zod";

export const schoolFormSchema = z.object({
    studentType: z.string(),
    studyArea: z.string(),
    purpose: z.string(),
});

export const workFormSchema = z.object({
    function: z.string(),
    companySize: z.string(),
    role: z.string(),
    purpose: z.string()
})

export const studentTypeOptions = [
    {
        value: "High School Student",
        label: "High School Student",
    },
    {
        value: "College Student",
        label: "College Student",
    },
    {
        value: "Graduate Student",
        label: "Graduate Student",
    },
    {
        value: "Other",
        label: "Other",
    },
]

export const studyAreaOptions = [
    {
        value: "Fine Arts, Performance Arts, Media, or Design",
        label: "Fine Arts, Performance Arts, Media, or Design",
    },
    {
        value: "Business Administration, Marketing, Economics, Finance, or Accounting",
        label: "Business Administration, Marketing, Economics, Finance, or Accounting",
    },
    {
        value: "Humanities, English or Foreign Language",
        label: "Humanities, English or Foreign Language",
    },
    {
        value: "Computer Science, Engineering or Related Technology",
        label: "Computer Science, Engineering or Related Technology",
    },
    {
        value: "Education, Teaching or Child Development",
        label: "Education, Teaching or Child Development",
    },
    {
        value: "Medicine, Health Sciences, or Allied Health",
        label: "Medicine, Health Sciences, or Allied Health",
    },
    {
        value: "Life Sciences, Earth Science, or Physical Sciences",
        label: "Life Sciences, Earth Science, or Physical Sciences",
    },
    {
        value: "Social Sciences or Behavioral Sciences",
        label: "Social Sciences or Behavioral Sciences",
    },
    {
        value: "Mathematics, Statistics, or Applied Mathematics",
        label: "Mathematics, Statistics, or Applied Mathematics",
    },
    {
        value: "Undecided",
        label: "Undecided",
    },
    {
        value: "Other",
        label: "Other",
    }
];

export const functionOptions = [
    {
        value: "Accounting, Finance or Insurance Services",
        label: "Accounting, Finance or Insurance Services"
    },
    {
        value: "Adminstrative, Operations, or Quality Assurance",
        label: "Adminstrative, Operations, or Quality Assurance"
    },
    {
        value: "Community and Social Services, Non-Profit, or Program Management",
        label: "Community and Social Services, Non-Profit, or Program Management",
    },
    {
        value: "Consulting",
        label: "Consulting",
    },
    {
        value: "Engineering",
        label: "Engineering",
    },
    {
        value: "Education",
        label: "Education",
    },
    {
        value: "Healthcare and Wellness Services",
        label: "Healthcare and Wellness Services",
    },
    {
        value: "Human Resources, Recruiting, or Learning and Development",
        label: "Human Resources, Recruiting, or Learning and Development",
    },
    {
        value: "Information Technology",
        label: "Information Technology",
    },
    {
        value: "Legal Services",
        label: "Legal Services",
    },
    {
        value: "Marketing, Media, or Communications",
        label: "Marketing, Media, or Communications",
    },
    {
        value: "Product Management",
        label: "Product Management",
    },
    {
        value: "Research",
        label: "Research",
    },
    {
        value: "Sales or Business Development",
        label: "Sales or Business Development",
    },
    {
        value: "Customer support",
        label: "Customer support",
    },
    {
        value: "Sciences",
        label: "Sciences",
    },
    {
        value: "Other",
        label: "Other",
    },
]

export const companySizeOptions = [
    {
        value: "Just me",
        label: "Just me",
    },
    {
        value: "2-20 employees",
        label: "2-20 employees",
    },
    {
        value: "21-50 employees",
        label: "21-50 employees",
    },
    {
        value: "51-100 employees",
        label: "51-100 employees",
    },
    {
        value: "101-250 employees",
        label: "101-250 employees",
    },
    {
        value: "251-750 employees",
        label: "251-750 employees",
    },
    {
        value: "751-2500 employees",
        label: "751-2500 employees",
    },
    {
        value: "2500+ employees",
        label: "2500+ employees",
    },
]

export const roleOptions = [
    {
        label: "Team member",
        value: "Team member",
    },
    {
        label: "Manager",
        value: "Manager",
    },
    {
        label: "Director",
        value: "Director"
    },
    {
        label: "CEO or Owner",
        value: "CEO or Owner"
    },
]