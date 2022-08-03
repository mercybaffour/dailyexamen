package com.mercy.project.examen;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ToString
@Getter
@Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table
public class Examen {
    @Id
    @SequenceGenerator(
            name = "examen_sequence",
            sequenceName = "examen_sequence",
            allocationSize = 1
    )
    @GeneratedValue(
            generator= "examen_sequence",
            strategy = GenerationType.SEQUENCE)
    private Long id;
    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Mood mood;
    @NotBlank
    @Column(nullable = false)
    private String title;
    @NotBlank
    private String q1;
    @NotBlank
    private String q2;
    @NotBlank
    private String q3;
    @NotBlank
    private String q4;
    @NotBlank
    private String q5;

    public Examen(String title, Mood mood, String q1, String q2, String q3, String q4, String q5) {
        this.title = title;
        this.mood = mood;
        this.q1 = q1;
        this.q2 = q2;
        this.q3 = q3;
        this.q4 = q4;
        this.q5 = q5;
    }
}
