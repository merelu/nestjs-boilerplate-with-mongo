import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import {
  BaseMetaResponseFormat,
  ResponseFormat,
} from '../interceptors/response.interceptor';

export const ApiResponseType = <
  TModel extends Type<any>,
  MetaModel extends Type<BaseMetaResponseFormat>,
>(
  model: TModel,
  metaModel: MetaModel,
) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseFormat) },
          {
            properties: {
              data: {
                $ref: getSchemaPath(model),
              },
              meta: {
                $ref: getSchemaPath(metaModel),
              },
            },
          },
        ],
      },
    }),
  );
};
