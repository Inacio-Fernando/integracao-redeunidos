import { Column, Entity } from 'typeorm';

@Entity('VW_UNVDIGITAL_PRODUTO', { schema: 'cf_teste' })
export class ProductEntity {
  @Column('int', { name: 'id_Loja' })
  idLoja: number;

  @Column('int', { name: 'plu' })
  plu: number;

  @Column('varchar', { name: 'descricao', nullable: true, length: 150 })
  descricao: string | undefined;

  @Column('varchar', { name: 'Marca', nullable: true, length: 30 })
  marca: string | undefined;

  @Column('varchar', { name: 'unidade', nullable: true, length: 2 })
  unidade: string | undefined;

  @Column('bigint', { name: 'codigo_barra', nullable: true })
  codigoBarra: string | undefined;

  @Column('datetime', { name: 'dt_cadastro', nullable: true })
  dtCadastro: Date | undefined;

  @Column('datetime', { name: 'dt_ultima_alteracao', nullable: true })
  dtUltimaAlteracao: Date | undefined;

  @Column('varchar', { name: 'ativo', nullable: true, length: 1 })
  ativo: string | undefined;

  @Column('float', { name: 'Vlr_Cluster', nullable: true, precision: 12 })
  vlrCluster: number | undefined;

  @Column('float', { name: 'vlr_promocao', nullable: true, precision: 12 })
  vlrPromocao: number | undefined;

  @Column('float', { name: 'vlr_produto', nullable: true, precision: 12 })
  vlrProduto: number | undefined;
}
