
export interface CustomInputProps<T> {
    value: T;
    onChange: (value: T) => void; 
    [x:string]: any;
}