package de.fhws.applab.fiwmodules.api.states;

import de.fhws.applab.fiwmodules.models.Lecturer;
import de.fhws.applab.norbury.core.api.states.get.AbstractGetCollectionState;

import static de.fhws.applab.fiwmodules.api.states.TransitionHelper.queryRelationType;
import static de.fhws.applab.fiwmodules.api.states.TransitionHelper.queryTemplate;

/**
 * Created by braunpet on 05.08.15.
 */
public class GetLecturersByQuery extends AbstractGetCollectionState<Lecturer>
{

	public GetLecturersByQuery( )
	{
	}

	@Override protected void configureState( )
	{
		super.configureState( );
	}

	@Override protected void defineTransitionLinks( )
	{
		addLink( queryTemplate( ), queryRelationType( ) );
	}
}
