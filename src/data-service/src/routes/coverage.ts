import {Request, Response, Router} from "express";
import {CodeCoverageService} from "../services/CodeCoverageService";

const codeCoverageService = new CodeCoverageService();
const codeCoverageRoute = Router();
codeCoverageRoute.post('analyze', async (req: Request, res: Response) => {
  const { repositoryUrl } = req.body;

  try {
    const analysisResult = await codeCoverageService.analyzeCode(repositoryUrl);

    if (analysisResult.success) {
      res.status(200).json({
        success: true,
        message: analysisResult.message,
        reportPath: analysisResult.reportPath,
      });
    } else {
      res.status(400).json({
        success: false,
        message: analysisResult.message,
        error: analysisResult.error,
      });
    }
  } catch (error: Error | any) {
    console.error('Code analysis error:', error);
    res.status(500).json({
      success: false,
      message: 'Code analysis error',
      error: error?.message
    });
  }
});


export default codeCoverageRoute;