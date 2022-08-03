package com.mercy.project.examen;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/v1/examens")
@AllArgsConstructor
public class ExamenController {

    private final ExamenService examenService;

    @GetMapping
    public List<Examen> getAllExamens(){
        return examenService.getAllExamens();
    }

    @PostMapping
    public void addExamen(@Valid @RequestBody Examen examen){
        examenService.addExamen(examen);
    }

    @DeleteMapping(path = "{examenId}")
    public void deleteExamen(@PathVariable("examenId") Long examenId){
        examenService.deleteExamen(examenId);
    }
}
