import Avatar from "@mui/material/Avatar";

const CustomAvatar2 = ({ name }) => {
  // Extract the first two initials from the username
  const getInitials = (fullName) => {
   // Default fallback
    const words = fullName.trim().split(" ");
    
    // Handle names with multiple words
    return (
      words[0].charAt(0).toUpperCase() + 
      (words[1] ? words[1].charAt(0).toUpperCase() : "")
    );
  };

  return (
    <Avatar sx={{ width: 90, height: 90, fontSize: 17 }}>
   
    </Avatar>
  );
};

export default CustomAvatar2;
