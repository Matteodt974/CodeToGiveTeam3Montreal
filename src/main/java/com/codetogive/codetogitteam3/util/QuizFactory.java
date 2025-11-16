package com.codetogive.codetogitteam3.util;

import com.codetogive.codetogitteam3.domain.QuizOption;
import com.codetogive.codetogitteam3.domain.QuizQuestion;

import java.util.ArrayList;
import java.util.List;

public class QuizFactory {
    public static List<QuizQuestion> build() {
        List<QuizQuestion> questions = new ArrayList<>();

        QuizQuestion q1 = QuizQuestion.builder()
                .text("Vous entendez des cris chez vos voisins tard le soir. Que faites-vous ?")
                .build();
        QuizOption q1o1 = QuizOption.builder().question(q1).text("Ignorer, ce n’est pas mes affaires").empathic(false).build();
        QuizOption q1o2 = QuizOption.builder().question(q1).text("Appeler discrètement une ligne d’aide").empathic(true).build();
        QuizOption q1o3 = QuizOption.builder().question(q1).text("Aller confronter immédiatement la personne").empathic(false).build();
        q1.setOptions(new ArrayList<>(List.of(q1o1, q1o2, q1o3)));
        questions.add(q1);

        QuizQuestion q2 = QuizQuestion.builder()
                .text("Une amie se confie sur un contrôle excessif de son partenaire.")
                .build();
        QuizOption q2o1 = QuizOption.builder().question(q2).text("Lui dire que ce n’est sûrement pas si grave").empathic(false).build();
        QuizOption q2o2 = QuizOption.builder().question(q2).text("L’écouter et proposer des ressources").empathic(true).build();
        QuizOption q2o3 = QuizOption.builder().question(q2).text("En parler au partenaire").empathic(false).build();
        q2.setOptions(new ArrayList<>(List.of(q2o1, q2o2, q2o3)));
        questions.add(q2);

        return questions;
    }
}
