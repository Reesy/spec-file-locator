
import { StrippedFileInfo } from "./StrippedFileInfo";

export interface ISpecFileLocator 
{
   /**
    * @description Provided a file path this function will deduce it's spec file. (If one exists)
    * @param {string} filePath The location of the target file. 
    */
    deduceSpecFileName(fileInfo: StrippedFileInfo): string;

    /**
     * @description This function will read a given filePath string and return an object describing it.
     * @param {string} filePath The filePath needed.
     */
    generateFileInfo(filePath: string): StrippedFileInfo;


    /**
     * 
     * @param filePath 
     */
    readFileSystemForSpecFile(filePathToSearchFrom: string, expectedTestFileName: string): string

    /**
     * @description This will search for a 'test' folder in sibling and parent folders, at each stage any spec/Spec.js files found will have its path returned.
     * @param filePath The filePath on which the search should begin.
     */
    readFileSystemForModuleSpecFiles(filePath: string): Array<string>;

}
