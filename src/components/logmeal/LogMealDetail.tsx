// src/components/logmeal/LogMealDetail.tsx
import { MealAnalysis } from "../../services/meal-service";
import {
  ClockIcon,
  FireIcon,
  BeakerIcon,
  ScaleIcon,
  HeartIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/outline";

interface LogMealDetailProps {
  analysis: MealAnalysis;
}

export default function LogMealDetail({ analysis }: LogMealDetailProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "GREEN":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "YELLOW":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "RED":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getOccasionText = (occasion: string) => {
    const occasionMap: Record<string, string> = {
      breakfast: "Café da Manhã",
      lunch: "Almoço",
      dinner: "Jantar",
      snack: "Lanche",
    };
    return occasionMap[occasion] || occasion;
  };

  const formatDateTime = (timestamp: string) => {
    try {
      const date = new Date(timestamp);
      if (isNaN(date.getTime())) return timestamp;

      return date.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    } catch {
      return timestamp;
    }
  };

  const metrics = analysis.metrics || {
    totalCalories: 0,
    totalCarbs: 0,
    totalNetCarbs: 0,
    totalFiber: 0,
    totalProtein: 0,
    totalFat: 0,
  };

  const classification = analysis.classification || {
    diabeticSuitability: "unknown",
    safetyStatus: "GREEN",
    isRecommended: false,
    isFavorite: false,
  };

  const aiAnalysis = analysis.aiAnalysis || {
    summary: {
      mealBalance: "N/A",
      glycemicRisk: "N/A",
      verdict: "N/A",
    },
    medicalFeedback: {
      reason: "N/A",
      medicalSuggestion: "N/A",
      alternatives: [],
    },
    patientInstructions: {
      insulinTiming: "N/A",
      exerciseSuggestion: "N/A",
      postMealMonitoring: "N/A",
    },
  };

  const processedData = analysis.processedData || {
    insights: {
      carbSources: [],
      suggestions: [],
    },
    mealNutrition: {
      mealType: "N/A",
      glycemicLoad: 0,
      fiberToCarbRatio: 0,
      dailyPercentages: {
        carbs: 0,
        fiber: 0,
        protein: 0,
      },
    },
  };

  return (
    <div className="space-y-6">
      {/* Header do Detalhe */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Detalhes da Análise
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ID: {analysis.id.substring(0, 8)}... | Usuário:{" "}
            {analysis.user?.firstname || "N/A"} {analysis.user?.lastname || ""}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(classification.safetyStatus)}`}
          >
            Status: {classification.safetyStatus}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              classification.isRecommended
                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
            }`}
          >
            {classification.isRecommended ? "Recomendado" : "Não Recomendado"}
          </span>
          {classification.isFavorite && (
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
              ⭐ Favorito
            </span>
          )}
        </div>
      </div>

      {/* Grid de Informações */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Informações Básicas */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <ClockIcon className="w-4 h-4" />
            Informações Básicas
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Tipo de Refeição:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {getOccasionText(analysis.occasion)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Data/Hora:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {formatDateTime(analysis.timestamps)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Sucesso:
              </span>
              <span
                className={`text-sm font-medium ${
                  analysis.success
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {analysis.success ? "✓ Sim" : "✗ Não"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Adequação Diabética:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {classification.diabeticSuitability}
              </span>
            </div>
          </div>
        </div>

        {/* Métricas Nutricionais */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <ScaleIcon className="w-4 h-4" />
            Métricas Nutricionais
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <FireIcon className="w-3 h-3" /> Calorias:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {metrics.totalCalories.toFixed(0)} kcal
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <BeakerIcon className="w-3 h-3" /> Carboidratos Líquidos:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {metrics.totalNetCarbs.toFixed(1)}g
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Carboidratos Totais:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {metrics.totalCarbs.toFixed(1)}g
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Fibras:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {metrics.totalFiber.toFixed(1)}g
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Proteínas:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {metrics.totalProtein.toFixed(1)}g
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Gorduras:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {metrics.totalFat.toFixed(1)}g
              </span>
            </div>
          </div>
        </div>

        {/* Análise da IA */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <HeartIcon className="w-4 h-4" />
            Análise da IA
          </h4>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Equilíbrio:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {aiAnalysis.summary.mealBalance}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Risco Glicêmico:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {aiAnalysis.summary.glycemicRisk}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Veredito:
              </span>
              <span
                className={`text-sm font-medium ${
                  aiAnalysis.summary.verdict.includes("Aprovada")
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {aiAnalysis.summary.verdict}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Carga Glicêmica:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {processedData.mealNutrition.glycemicLoad.toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Relação Fibra/Carb:
              </span>
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                {processedData.mealNutrition.fiberToCarbRatio.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Fontes de Carboidratos */}
      {processedData.insights.carbSources &&
        processedData.insights.carbSources.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-gray-700 dark:text-gray-300">
              Fontes de Carboidratos Identificadas
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {processedData.insights.carbSources.map((source, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-300">
                      {source.food}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {source.carbs.toFixed(1)}g
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Sugestões e Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sugestões */}
        {processedData.insights.suggestions &&
          processedData.insights.suggestions.length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium text-gray-700 dark:text-gray-300">
                Sugestões
              </h4>
              <div className="space-y-3">
                {processedData.insights.suggestions.map((suggestion, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg"
                  >
                    <div className="text-blue-500 dark:text-blue-400 mt-0.5">
                      💡
                    </div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {suggestion}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Feedback Médico */}
        <div className="space-y-4">
          <h4 className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
            <ExclamationCircleIcon className="w-4 h-4" />
            Feedback Médico
          </h4>
          <div className="space-y-3">
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                Razão:
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {aiAnalysis.medicalFeedback.reason}
              </p>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <p className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-1">
                Sugestão Médica:
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {aiAnalysis.medicalFeedback.medicalSuggestion}
              </p>
            </div>
            {aiAnalysis.medicalFeedback.alternatives &&
              aiAnalysis.medicalFeedback.alternatives.length > 0 && (
                <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <p className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
                    Alternativas Sugeridas:
                  </p>
                  <ul className="space-y-1">
                    {aiAnalysis.medicalFeedback.alternatives.map(
                      (alt, index) => (
                        <li
                          key={index}
                          className="text-sm text-gray-700 dark:text-gray-300 flex items-center gap-2"
                        >
                          <span className="text-purple-500">•</span> {alt}
                        </li>
                      ),
                    )}
                  </ul>
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Instruções para o Paciente */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-700 dark:text-gray-300">
          Instruções para o Paciente
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
              ⏰ Timing de Insulina
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {aiAnalysis.patientInstructions.insulinTiming}
            </p>
          </div>
          <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
              🏃‍♂️ Sugestão de Exercício
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {aiAnalysis.patientInstructions.exerciseSuggestion}
            </p>
          </div>
          <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-lg">
            <p className="text-sm font-medium text-gray-800 dark:text-gray-300 mb-2">
              📊 Monitoramento Pós-Refeição
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {aiAnalysis.patientInstructions.postMealMonitoring}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
