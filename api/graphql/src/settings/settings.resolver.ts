import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ContactInput, ContactResponse } from './dto/create-setting.input';
import { GetSettingArgs } from './dto/get-setting.args';
import { SettingsInput } from './dto/update-setting.input';
import { Setting } from './entities/setting.entity';
import { SettingsService } from './settings.service';

@Resolver(() => Setting)
export class SettingsResolver {
  constructor(private readonly settingsService: SettingsService) {}

  // @Mutation(() => Setting)
  // createSetting(
  //   @Args('createSettingInput') createSettingInput: CreateSettingInput,
  // ) {
  //   return this.settingsService.create(createSettingInput);
  // }

  @Query(() => Setting, { name: 'settings' })
  findAll(@Args() settingsInput: GetSettingArgs) {
    return this.settingsService.getSettings();
  }

  // @Query(() => Category, { name: 'category' })
  // async findAll(
  //   @Args() getCategoryArgs: GetCategoryArgs,
  // ): Promise<Category> {
  //   return this.categoriesService.getCategory(getCategoryArgs);
  // }

  // @Query(() => Setting, { name: 'setting' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.settingsService.findOne(id);
  // }

  @Mutation(() => Setting)
  updateSettings(@Args('input') updateSettingInput: SettingsInput) {
    return this.settingsService.updateSettings(updateSettingInput);
  }

  // @Mutation(() => Setting)
  // removeSetting(@Args('id', { type: () => Int }) id: number) {
  //   return this.settingsService.remove(id);
  // }
  @Mutation(() => ContactResponse)
  contactUs(@Args('input', { nullable: true }) contactInput?: ContactInput) {
    console.log(contactInput);
    return {
      message: 'Thanks for contacting us!',
      success: true,
    };
  }
}
