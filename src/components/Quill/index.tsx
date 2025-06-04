
import React from "react";
import { Editor, EditorTextChangeEvent } from "primereact/editor";
import { Controller } from "react-hook-form";
import { classNames } from "primereact/utils";

interface IQuillProps {
    name: string;
    control: any;
    className?: string;
}

export default function Quill({ name, control, className ='' }: IQuillProps) {

    const renderHeader = () => {
      return (
          <span className="ql-formats" >
              <button className="ql-bold" aria-label="Bold"></button>
              <button className="ql-italic" aria-label="Italic"></button>
              <button className="ql-underline" aria-label="Underline"></button>
              <button className="ql-image" aria-label="Image"></button>
          </span>
      );
  };

  const header = renderHeader();

    return (
        <div className={`${className} w-full`}>
          <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <Editor 
            value={field.value} 
            headerTemplate={header} 
            onTextChange={(e: EditorTextChangeEvent) => field.onChange(e.htmlValue)} 
            style={{ height: '150px'  }} 
            placeholder="Digite aqui sua mensagem..."
            />
          )}
        />
        </div>
    )
}
        