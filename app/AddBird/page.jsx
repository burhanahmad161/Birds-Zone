"use client";
import Image from "next/image";
import Logo from "../../Assets/logo.png"
import React from "react";
import Footer from "../Components/Footer";
import { HomeIcon } from "lucide-react";

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navabar";

const AddBirdForSale = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const [formData, setFormData] = useState({
    species: "",
    ageRange: "",
    eyeColor: "",
    gender: "",
    isBreeder: "",
    clutches: "",
    whatsapp: "",
    description: "",
    price: "",
    city: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("species", formData.species);
      formDataToSend.append("ageRange", formData.ageRange);
      formDataToSend.append("eyeColor", formData.eyeColor);
      formDataToSend.append("gender", formData.gender);
      formDataToSend.append("isBreeder", formData.isBreeder);
      if (formData.isBreeder === "Yes") {
        formDataToSend.append("clutches", formData.clutches);
      }
      formDataToSend.append("whatsapp", formData.whatsapp);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("city", formData.city);
      if (imageFile) formDataToSend.append("image", imageFile);

      const response = await fetch("/api/birds", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Bird listed successfully on Birds Zone!");
        setTimeout(() => router.push("/my-birds"), 2000);
      } else {
        setMessage(data.error || "Failed to list bird.");
      }
    } catch (error) {
      setMessage("Error: Unable to list your bird.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ background: "#f4fff4", minHeight: "100vh", py: { xs: 3, md: 6 }, px: { xs: 2, md: 4 } }}>
        <Typography variant="h3" fontWeight="bold" color="#006400" align="center" gutterBottom>
          Sell Your Bird on Birds Zone
        </Typography>
        <Typography variant="h6" color="#2e7d32" align="center" mb={5} fontWeight="medium">
          Post your bird for sale & reach thousands of bird lovers in Pakistan
        </Typography>

        <Grid container spacing={6} justifyContent="center">
          {/* Form */}
          <Grid item xs={12} md={7}>
            <Box
              sx={{
                background: "#fff",
                borderRadius: 4,
                boxShadow: "0 15px 40px rgba(0,0,0,0.1)",
                p: { xs: 3, md: 5 },
              }}
            >
              <form onSubmit={handleSubmit}>
                {/* Species */}
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Bird Species</InputLabel>
                  <Select name="species" value={formData.species} onChange={handleChange}>
                    <MenuItem value="Lovebirds">Lovebirds</MenuItem>
                    <MenuItem value="Cockatiels">Cockatiels</MenuItem>
                    <MenuItem value="Budgies">Budgies (Australian Parakeet)</MenuItem>
                    <MenuItem value="Macaws">Macaws</MenuItem>
                    <MenuItem value="African Grey">African Greys</MenuItem>
                    <MenuItem value="Sun Conures">Sun Conures</MenuItem>
                    <MenuItem value="Caiques">Caiques</MenuItem>
                    <MenuItem value="Ringnecks">Ringneck Parakeets</MenuItem>
                    <MenuItem value="Finches">Finches</MenuItem>
                    <MenuItem value="Canaries">Canaries</MenuItem>
                    <MenuItem value="Java Sparrows">Java Sparrows</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                </FormControl>

                {/* Age */}
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Age</InputLabel>
                  <Select name="ageRange" value={formData.ageRange} onChange={handleChange}>
                    <MenuItem value="0-3 months">0-3 months (Chicks)</MenuItem>
                    <MenuItem value="3-6 months">3-6 months</MenuItem>
                    <MenuItem value="6-9 months">6-9 months</MenuItem>
                    <MenuItem value="9-12 months">9-12 months</MenuItem>
                    <MenuItem value="1+ year">1+ year (Adult)</MenuItem>
                  </Select>
                </FormControl>

                {/* Eye Color */}
                <FormControl fullWidth margin="normal" required>
                  <InputLabel>Eye Color</InputLabel>
                  <Select name="eyeColor" value={formData.eyeColor} onChange={handleChange}>
                    <MenuItem value="Red">Red Eyes</MenuItem>
                    <MenuItem value="Black">Black Eyes</MenuItem>
                  </Select>
                </FormControl>
                <div className="flex flex-col md:flex-col md:gap-4">
                  {/* Gender */}
                  <FormControl component="fieldset" margin="normal">
                    <FormLabel component="legend">Gender *</FormLabel>
                    <RadioGroup row name="gender" value={formData.gender} onChange={handleChange}>
                      <FormControlLabel className="text-black" value="Male" control={<Radio />} label="Male" />
                      <FormControlLabel className="text-black" value="Female" control={<Radio />} label="Female" />
                      <FormControlLabel className="text-black" value="Pair" control={<Radio />} label="Pair (Male + Female)" />
                    </RadioGroup>
                  </FormControl>

                  {/* Proven Breeder */}
                  <FormControl component="fieldset" margin="normal" className="flex flex-col">
                    <FormLabel component="legend">Proven Breeder?</FormLabel>
                    <RadioGroup row name="isBreeder" value={formData.isBreeder} onChange={handleChange}>
                      <FormControlLabel className="text-black" value="Yes" control={<Radio />} label="Yes" />
                      <FormControlLabel className="text-black" value="No" control={<Radio />} label="No" />
                    </RadioGroup>
                  </FormControl>

                </div>

                {/* Clutches */}
                {formData.isBreeder === "Yes" && (
                  <TextField
                    fullWidth
                    margin="normal"
                    label="How many clutches raised?"
                    name="clutches"
                    type="number"
                    value={formData.clutches}
                    onChange={handleChange}
                    InputProps={{ inputProps: { min: 0 } }}
                    required
                  />
                )}

                {/* WhatsApp */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Your WhatsApp Number *"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleChange}
                  placeholder="03xx-xxxxxxx"
                  required
                />

                {/* Description */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Description (Health, Behavior, Mutation, etc.) *"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={5}
                  required
                />
                {/* City */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="City *"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                />

                {/* Price */}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Selling Price (PKR) *"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  InputProps={{ inputProps: { min: 1000 } }}
                  required
                />

                {/* Image Upload */}
                <Box my={3}>
                  <Button variant="outlined" component="label" fullWidth startIcon={<ImageIcon />}>
                    Upload Clear Photos (Face, Eyes, Full Body)
                    <input type="file" hidden accept="image/*" onChange={handleImageChange} required />
                  </Button>
                  {imagePreview && (
                    <Box mt={2} textAlign="center">
                      <img
                        src={imagePreview}
                        alt="Bird preview"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "450px",
                          borderRadius: "16px",
                          border: "3px solid #4caf50",
                        }}
                      />
                    </Box>
                  )}
                </Box>

                {/* Submit */}
                <Button
                  type="submit"
                  variant="contained"
                  color="success"
                  size="large"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 3, py: 2, fontSize: "1.2rem", fontWeight: "bold" }}
                >
                  {loading ? <CircularProgress size={28} /> : "Post Bird for Sale"}
                </Button>

                {message && (
                  <Typography
                    variant="body1"
                    align="center"
                    mt={3}
                    color={message.includes("successfully") ? "success.main" : "error.main"}
                    fontWeight="bold"
                  >
                    {message}
                  </Typography>
                )}
              </form>
            </Box>
          </Grid>

          {/* Tips Sidebar */}
          <Grid item xs={12} md={5}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card sx={{ boxShadow: 6 }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" color="#006400" gutterBottom>
                      Why Sell on Birds Zone?
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                        <ListItemText primary="Reach 50,000+ bird lovers in Pakistan" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                        <ListItemText primary="Free listing – no commission" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><CheckCircleIcon color="success" /></ListItemIcon>
                        <ListItemText primary="Direct WhatsApp contact with buyers" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card sx={{ boxShadow: 6 }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight="bold" color="#006400" gutterBottom>
                      Pro Tips for Quick Sale
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon><LightbulbIcon color="warning" /></ListItemIcon>
                        <ListItemText primary="Take bright daylight photos" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><LightbulbIcon color="warning" /></ListItemIcon>
                        <ListItemText primary="Show close-up of eyes & mutation" />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon><LightbulbIcon color="warning" /></ListItemIcon>
                        <ListItemText primary="Price fairly – proven breeders sell fast!" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
};

export default AddBirdForSale;