"use client";
import {
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
} from "@mui/material";
import React from "react";
import { useController } from "react-hook-form";
import '../css/main.css'

const Checkbox = ({ control, name }: any) => {
  const { field } = useController({ name, control, defaultValue: [] });

  const { onChange, value } = field;

  const handleChangeSkill = (skill: string, checked: boolean) => {
    let updatedValue = [...value];
    
    if (checked) {
      updatedValue.push(skill);
    } else {
      updatedValue = updatedValue.filter((item) => item !== skill);
    }

    onChange(updatedValue);
  };

  return (
    <FormControl component="fieldset" sx={{ mt: 1 }}>
      <FormLabel
        component="legend"
        className="formLable"
      >
        Skills
      </FormLabel>

      <FormGroup className="formGroup" sx={{display:"flex",flexDirection:"row"}}>
        {["JavaScript", "React", "TypeScript", "Node.js"].map((skill) => (
          <FormControlLabel
          className="FormControlLabel"
            key={skill}
            control={
              <input
                type="checkbox"
                checked={value.includes(skill)}
                onChange={(e) => handleChangeSkill(skill, e.target.checked)}
                className="input"
              />
            }
            label={skill}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
};

export default Checkbox;
