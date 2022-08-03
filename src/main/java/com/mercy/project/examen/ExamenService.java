package com.mercy.project.examen;

import com.mercy.project.examen.exception.BadRequestException;
import com.mercy.project.examen.exception.ExamenNotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ExamenService {

    private final ExamenRepository examenRepository;

    public List<Examen> getAllExamens(){
        return examenRepository.findAll();
    }

    public void addExamen(Examen examen){
        examenRepository.save(examen);
    }

    public void deleteExamen(Long examenId){
        //check if examen exists
        if(!examenRepository.existsById(examenId)){
            throw new ExamenNotFoundException(
                    "Examen with id" + examenId + " does not exist"
            );
        }
        examenRepository.deleteById(examenId);
    }
}
