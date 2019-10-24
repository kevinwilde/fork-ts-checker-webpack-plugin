// tslint:disable-next-line:no-implicit-dependencies
import * as ts from 'typescript'; // import for types alone
// tslint:disable-next-line:no-implicit-dependencies
import { RuleFailure } from 'tslint'; // import for types alone
import { CancellationToken } from './CancellationToken';
import { NormalizedMessage } from './NormalizedMessage';
import { ResolveTypeReferenceDirective, ResolveModuleName } from './resolution';
import { createEslinter } from './createEslinter';

export interface IncrementalCheckerInterface {
  nextIteration(): void;

  getDiagnostics(
    cancellationToken: CancellationToken
  ): Promise<NormalizedMessage[]>;

  hasLinter(): boolean;

  getLints(cancellationToken: CancellationToken): NormalizedMessage[];

  hasEsLinter(): boolean;

  getEsLints(cancellationToken: CancellationToken): NormalizedMessage[];
}

export interface ApiIncrementalCheckerParams {
  typescript: typeof ts;
  context: string;
  rootFiles: string[];
  compilerOptions: ts.CompilerOptions;
  createNormalizedMessageFromDiagnostic: (
    diagnostic: ts.Diagnostic
  ) => NormalizedMessage;
  linterConfigFile: string | boolean;
  linterAutoFix: boolean;
  createNormalizedMessageFromRuleFailure: (
    ruleFailure: RuleFailure
  ) => NormalizedMessage;
  eslinter: ReturnType<typeof createEslinter> | undefined;
  checkSyntacticErrors: boolean;
  resolveModuleName: ResolveModuleName | undefined;
  resolveTypeReferenceDirective: ResolveTypeReferenceDirective | undefined;
}

export interface IncrementalCheckerParams extends ApiIncrementalCheckerParams {
  programConfigFile: string;
  watchPaths: string[];
  workNumber: number;
  workDivision: number;
  vue: boolean;
}
