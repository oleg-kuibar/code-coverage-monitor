import {Request, Response, Router} from "express";
import {CodeCoverageService} from "../services/CodeCoverageService";

const codeCoverageService = new CodeCoverageService();
const codeCoverageRoute = Router();
/**
 * @swagger
 * /api/analyze:
 *   post:
 *     summary: Analyze code coverage
 *     tags:
 *       - Code Coverage
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               repositoryUrl:
 *                 type: string
 *             example:
 *               repositoryUrl: https://github.com/owner/repo
 *     responses:
 *       200:
 *         description: Successful analysis
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 reportPath:
 *                   type: string
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 error:
 *                   type: string
 */
codeCoverageRoute.post('/analyze', async (req: Request, res: Response) => {
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
