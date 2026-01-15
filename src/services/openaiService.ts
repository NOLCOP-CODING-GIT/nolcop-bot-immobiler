import OpenAI from "openai";
import { generateSystemPrompt, nolcopData } from "../data/entrepriseData";

type ChatCompletionMessageParam =
  OpenAI.Chat.Completions.ChatCompletionMessageParam;

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// ... rest of the code remains the same ...
export interface PropertyCriteria {
  type?: "appartement" | "maison" | "studio" | "villa" | "loft";
  location?: string;
  budget?: number;
  rooms?: number;
  surface?: number;
  transaction?: "achat" | "location";
}

export interface PropertyRecommendation {
  title: string;
  type: string;
  location: string;
  price: number;
  description: string;
  features: string[];
  contact: string;
}

class ImmobilierAIService {
  private systemPrompt = generateSystemPrompt(nolcopData);

  async chatWithAI(
    message: string,
    conversationHistory: Array<{ role: string; content: string }> = []
  ): Promise<string> {
    try {
      const messages = [
        { role: "system", content: this.systemPrompt },
        ...conversationHistory.slice(-10), // Garde les 10 derniers messages pour le contexte
        { role: "user", content: message },
      ];

      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: messages as ChatCompletionMessageParam[],
        max_tokens: 500,
        temperature: 0.7,
      });

      return (
        completion.choices[0]?.message?.content ||
        "Désolé, je n'ai pas pu traiter votre demande."
      );
    } catch (error) {
      console.error("Erreur OpenAI:", error);
      return "Je rencontre une difficulté technique. Pouvez-vous reformuler votre question ?";
    }
  }

  async getPropertyRecommendations(
    criteria: PropertyCriteria
  ): Promise<PropertyRecommendation[]> {
    const prompt = `Basé sur ces critères, recommande 3 biens immobiliers pertinents:
    - Type: ${criteria.type || "non spécifié"}
    - Localisation: ${criteria.location || "non spécifiée"}
    - Budget: ${criteria.budget ? criteria.budget + "€" : "non spécifié"}
    - Pièces: ${criteria.rooms || "non spécifié"}
    - Surface: ${criteria.surface ? criteria.surface + "m²" : "non spécifiée"}
    - Transaction: ${criteria.transaction || "non spécifiée"}

    Format de réponse attendu pour chaque bien:
    Titre: [Titre du bien]
    Type: [Type de bien]
    Localisation: [Quartier/Ville]
    Prix: [Prix en €]
    Description: [Courte description du bien]
    Caractéristiques: [Liste des points forts]
    Contact: [Informations de contact]`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: prompt },
        ] as ChatCompletionMessageParam[],
        max_tokens: 800,
        temperature: 0.6,
      });

      const response = completion.choices[0]?.message?.content || "";
      return this.parseRecommendations(response);
    } catch (error) {
      console.error("Erreur recommandations:", error);
      return [];
    }
  }

  async estimateProperty(propertyInfo: {
    type: string;
    location: string;
    surface: number;
    rooms: number;
    condition?: string;
  }): Promise<string> {
    const prompt = `Estime la valeur de marché de ce bien immobilier:
    - Type: ${propertyInfo.type}
    - Localisation: ${propertyInfo.location}
    - Surface: ${propertyInfo.surface}m²
    - Pièces: ${propertyInfo.rooms}
    - État: ${propertyInfo.condition || "standard"}

    Fournis une estimation réaliste basée sur le marché actuel français, avec une fourchette de prix et les facteurs influençant la valorisation.`;

    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [
          { role: "system", content: this.systemPrompt },
          { role: "user", content: prompt },
        ] as ChatCompletionMessageParam[],
        max_tokens: 400,
        temperature: 0.3,
      });

      return (
        completion.choices[0]?.message?.content ||
        "Impossible de faire une estimation précise."
      );
    } catch (error) {
      console.error("Erreur estimation:", error);
      return "Erreur lors de l'estimation du bien.";
    }
  }

  private parseRecommendations(response: string): PropertyRecommendation[] {
    const recommendations: PropertyRecommendation[] = [];
    const sections = response
      .split("Titre:")
      .filter((section) => section.trim());

    sections.forEach((section) => {
      const lines = section
        .trim()
        .split("\n")
        .filter((line) => line.trim());
      const rec: Partial<PropertyRecommendation> = {};

      lines.forEach((line) => {
        if (line.includes("Type:")) rec.type = line.split("Type:")[1]?.trim();
        if (line.includes("Localisation:"))
          rec.location = line.split("Localisation:")[1]?.trim();
        if (line.includes("Prix:"))
          rec.price = parseInt(
            line.split("Prix:")[1]?.replace(/[^\d]/g, "") || "0"
          );
        if (line.includes("Description:"))
          rec.description = line.split("Description:")[1]?.trim();
        if (line.includes("Caractéristiques:"))
          rec.features = line
            .split("Caractéristiques:")[1]
            ?.split(",")
            .map((f) => f.trim());
        if (line.includes("Contact:"))
          rec.contact = line.split("Contact:")[1]?.trim();
      });

      if (rec.type && rec.location && rec.price) {
        recommendations.push(rec as PropertyRecommendation);
      }
    });

    return recommendations;
  }
}

export const immobilierAI = new ImmobilierAIService();
