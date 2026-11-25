// Member 5: Demonstration accounts only (no private university/student records)
export const INITIAL_DEMO_USERS = [
  {
    _id: "demo-1",
    name: "Nadia Tarek",
    email: "nadia.tarek@campus.edu",
    department: "Computer Science",
    role: "buyer",
    phone: "010-0000-0101",
    meetupSpot: "Main Campus Library Entrance",
    bio: "Looking for 3rd-year algorithms textbooks and a scientific calculator."
  },
  {
    _id: "demo-2",
    name: "Omar Khaled",
    email: "omar.khaled@campus.edu",
    department: "Engineering",
    role: "seller",
    phone: "010-0000-0202",
    meetupSpot: "Engineering Courtyard Cafe",
    bio: "Selling clean secondhand textbooks, breadboards, and lab supplies."
  },
  {
    _id: "demo-3",
    name: "Salma Hassan",
    email: "salma.hassan@campus.edu",
    department: "Information Systems",
    role: "moderator",
    phone: "010-0000-0303",
    meetupSpot: "Student Union Desk",
    bio: "Campus marketplace moderator reviewing listings and helping students."
  }
];

export const ROLE_LABELS = {
  buyer: "Student Buyer",
  seller: "Student Seller",
  moderator: "Moderator"
};
