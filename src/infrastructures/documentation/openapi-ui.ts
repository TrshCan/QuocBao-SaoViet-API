import { SwaggerCustomOptions } from '@nestjs/swagger';
import { SwaggerUiOptions } from '@nestjs/swagger/dist/interfaces/swagger-ui-options.interface';

export class SwaggerUI {
  constructor(private readonly applicationUrl: string) {}

  private customSiteTitle = 'Custom Swagger UI';
  private faviconFilename = 'nestjs-logo.png';
  private topbarIconFilename = 'app-logo.png';

  private get customfavIcon(): string {
    return `${this.applicationUrl}/wwwroot/swagger/assets/${this.faviconFilename}`;
  }

  private get customCss(): string {
    // Monokai theme colors
    const monokaiBg = '#272822';
    const monokaiBgSecondary = '#1E1F1C';
    const monokaiText = '#F8F8F2';
    const monokaiTextSecondary = '#75715E';
    const monokaiTextTertiary = '#B1bAC0';
    const monokaiBorder = '#49483E';
    const monokaiGet = '#A6E22E';
    const monokaiPost = '#66D9EF';
    const monokaiPut = '#FD971F';
    const monokaiPatch = '#AE81FF';
    const monokaiDelete = '#F92672';

    return `
    /* Monokai Theme - Base Styles */
    .swagger-ui { background-color: ${monokaiBg}; color: ${monokaiText}; }
    .swagger-ui .topbar { background-color: ${monokaiBgSecondary}; border-bottom: 1px solid ${monokaiBorder}; }
    .swagger-ui .topbar-wrapper { content:url('${this.applicationUrl}/wwwroot/swagger/assets/${this.topbarIconFilename}'); width:242px; height:auto; }
    .swagger-ui .topbar-wrapper svg { visibility: hidden; }
    
    /* Info Section */
    .swagger-ui .info { color: ${monokaiText}; }
    .swagger-ui .info .title { color: ${monokaiText}; }
    .swagger-ui .info .description p, .swagger-ui .info .description code { color: ${monokaiTextSecondary}; }
    
    /* Paragraph Tags */
    .swagger-ui p { color: ${monokaiTextTertiary}; }
    .swagger-ui .opblock-body p { color: ${monokaiTextTertiary}; }
    .swagger-ui .response p { color: ${monokaiTextTertiary}; }
    .swagger-ui .parameter p { color: ${monokaiTextTertiary}; }
    .swagger-ui .model p { color: ${monokaiTextTertiary}; }

    .swagger-ui .tab li { color: ${monokaiTextTertiary}; }
    .swagger-ui section.models h4 { color: ${monokaiTextTertiary}; }
    /* HTTP Method Blocks */
    .swagger-ui .opblock { background: ${monokaiBgSecondary}; border-color: ${monokaiBorder}; }
    .swagger-ui .opblock .opblock-summary { border-color: ${monokaiBorder}; }
    .swagger-ui .opblock .opblock-summary-description { color: ${monokaiText}; }
    .swagger-ui .opblock .opblock-summary-operation-id, .swagger-ui .opblock .opblock-summary-path { color: ${monokaiText}; }
     
    /* Path - Gray */
    .swagger-ui .opblock .opblock-title_normal { color: ${monokaiTextTertiary}; }
    .swagger-ui .opblock .opblock-title_normal:hover { color: ${monokaiText}; }
    .swagger-ui .opblock .opblock-title_normal:link { color: ${monokaiText}; }

    /* GET Method - Green */
    .swagger-ui .opblock.opblock-get { background-color: ${monokaiBgSecondary}; border-color: ${monokaiGet}; }
    .swagger-ui .opblock.opblock-get .opblock-summary { border-color: ${monokaiGet}; }
    .swagger-ui .opblock.opblock-get .opblock-summary-method { background: ${monokaiGet}; color: ${monokaiBg}; }
    
    /* POST Method - Cyan */
    .swagger-ui .opblock.opblock-post { background-color: ${monokaiBgSecondary}; border-color: ${monokaiPost}; }
    .swagger-ui .opblock.opblock-post .opblock-summary { border-color: ${monokaiPost}; }
    .swagger-ui .opblock.opblock-post .opblock-summary-method { background: ${monokaiPost}; color: ${monokaiBg}; }
    
    /* PUT Method - Orange */
    .swagger-ui .opblock.opblock-put { background-color: ${monokaiBgSecondary}; border-color: ${monokaiPut}; }
    .swagger-ui .opblock.opblock-put .opblock-summary { border-color: ${monokaiPut}; }
    .swagger-ui .opblock.opblock-put .opblock-summary-method { background: ${monokaiPut}; color: ${monokaiBg}; }
    
    /* PATCH Method - Purple */
    .swagger-ui .opblock.opblock-patch { background-color: ${monokaiBgSecondary}; border-color: ${monokaiPatch}; }
    .swagger-ui .opblock.opblock-patch .opblock-summary { border-color: ${monokaiPatch}; }
    .swagger-ui .opblock.opblock-patch .opblock-summary-method { background: ${monokaiPatch}; color: ${monokaiBg}; }
    
    /* DELETE Method - Red */
    .swagger-ui .opblock.opblock-delete { background-color: ${monokaiBgSecondary}; border-color: ${monokaiDelete}; }
    .swagger-ui .opblock.opblock-delete .opblock-summary { border-color: ${monokaiDelete}; }
    .swagger-ui .opblock.opblock-delete .opblock-summary-method { background: ${monokaiDelete}; color: ${monokaiBg}; }
    
    /* Request/Response Sections */
    .swagger-ui .opblock-body { background: ${monokaiBg}; }
    .swagger-ui .opblock-body pre { background: ${monokaiBgSecondary}; color: ${monokaiText}; border: 1px solid ${monokaiBorder}; }
    .swagger-ui .opblock-body .highlight-code { background: ${monokaiBgSecondary}; }
    .swagger-ui .opblock-body .highlight-code > .microlight { color: ${monokaiText}; }
    
    /* Parameters and Schemas */
    .swagger-ui .parameter__name { color: ${monokaiText}; }
    .swagger-ui .parameter__type { color: ${monokaiPost}; }
    .swagger-ui .parameter__in { color: ${monokaiTextSecondary}; }
    .swagger-ui .table-container { background: ${monokaiBgSecondary}; }
    .swagger-ui table thead tr td, .swagger-ui table thead tr th { border-color: ${monokaiBorder}; color: ${monokaiText}; }
    .swagger-ui table tbody tr td { border-color: ${monokaiBorder}; color: ${monokaiText}; }
    
    /* Input Fields */
    .swagger-ui input[type=text], .swagger-ui input[type=email], .swagger-ui input[type=password],
    .swagger-ui textarea, .swagger-ui select { 
      background: ${monokaiBgSecondary}; 
      border-color: ${monokaiBorder}; 
      color: ${monokaiText}; 
    }
    .swagger-ui input[type=text]:focus, .swagger-ui input[type=email]:focus, 
    .swagger-ui input[type=password]:focus, .swagger-ui textarea:focus, 
    .swagger-ui select:focus { 
      border-color: ${monokaiPost}; 
      box-shadow: 0 0 0 2px ${monokaiPost}33; 
    }
    
    /* Buttons */
    .swagger-ui .btn { 
      background: ${monokaiBgSecondary}; 
      border-color: ${monokaiBorder}; 
      color: ${monokaiText}; 
    }
    .swagger-ui .btn:hover { 
      background: ${monokaiBorder}; 
      border-color: ${monokaiTextSecondary}; 
    }
    .swagger-ui .btn.execute { 
      background: ${monokaiPost}; 
      border-color: ${monokaiPost}; 
      color: ${monokaiBg}; 
    }
    .swagger-ui .btn.execute:hover { 
      background: ${monokaiPost}dd; 
    }
    .swagger-ui .btn.authorize { 
      border-color: ${monokaiPost}; 
      color: ${monokaiPost}; 
      background: ${monokaiBgSecondary}; 
    }
    .swagger-ui .btn.authorize:hover { 
      background: ${monokaiPost}22; 
    }
    .swagger-ui .btn.authorize svg { fill: ${monokaiPost}; }
    
    /* Model and Schema */
    .swagger-ui .model-box { background: ${monokaiBgSecondary}; border-color: ${monokaiBorder}; }
    .swagger-ui .model-title { color: ${monokaiText}; }
    .swagger-ui .prop-name { color: ${monokaiGet}; }
    .swagger-ui .prop-type { color: ${monokaiPost}; }
    
    /* Response Codes */
    .swagger-ui .response-col_status { color: ${monokaiText}; }
    .swagger-ui .response-col_links { color: ${monokaiTextSecondary}; }
    
    /* Tags */
    .swagger-ui .opblock-tag { color: ${monokaiText}; border-color: ${monokaiBorder}; }
    .swagger-ui .opblock-tag:hover { background: ${monokaiBgSecondary}; }
    
    /* Loading */
    .swagger-ui .loading-container { background: ${monokaiBg}; }
    
    /* Scrollbar */
    .swagger-ui ::-webkit-scrollbar { width: 10px; height: 10px; }
    .swagger-ui ::-webkit-scrollbar-track { background: ${monokaiBgSecondary}; }
    .swagger-ui ::-webkit-scrollbar-thumb { background: ${monokaiBorder}; border-radius: 5px; }
    .swagger-ui ::-webkit-scrollbar-thumb:hover { background: ${monokaiTextSecondary}; }
    `;
  }

  private swaggerOptions: SwaggerUiOptions = {
    persistAuthorization: true,
    displayRequestDuration: true,
    filter: true,
    showExtensions: true,
    showCommonExtensions: true,
  };

  public get customOptions(): SwaggerCustomOptions {
    return {
      customfavIcon: this.customfavIcon,
      customSiteTitle: this.customSiteTitle,
      customCss: this.customCss,
      swaggerOptions: this.swaggerOptions,
    };
  }
}
